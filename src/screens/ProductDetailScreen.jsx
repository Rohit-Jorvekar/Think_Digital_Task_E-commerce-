import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';

const { width, height } = Dimensions.get('window');

/* ─────────────────────────────────────────────
   Star Rating — filled / half / empty
───────────────────────────────────────────── */
const StarRating = ({ rate }) => {
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i + 1 <= Math.floor(rate)) return 'full';
    if (i < rate) return 'half';
    return 'empty';
  });

  return (
    <View style={styles.starsRow}>
      {stars.map((type, i) => (
        <View key={i} style={styles.starContainer}>
          {/* background (empty) star */}
          <Text style={[styles.star, styles.starEmpty]}>★</Text>
          {/* foreground clip */}
          {type !== 'empty' && (
            <View
              style={[
                styles.starOverlay,
                type === 'half' && { width: '50%' },
              ]}
            >
              <Text style={[styles.star, styles.starFull]}>★</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

/* ─────────────────────────────────────────────
   Pill Tag
───────────────────────────────────────────── */
const Pill = ({ label }) => (
  <View style={styles.pill}>
    <Text style={styles.pillText}>{label}</Text>
  </View>
);

/* ─────────────────────────────────────────────
   Main Screen
───────────────────────────────────────────── */
const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;

  // Entry animations
  const fadeAnim   = useRef(new Animated.Value(0)).current;
  const slideAnim  = useRef(new Animated.Value(40)).current;
  const scaleAnim  = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, speed: 14, bounciness: 6, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, speed: 14, bounciness: 5, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero Image ── */}
        <Animated.View style={[styles.heroWrapper, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
          {/* Subtle ambient gradient behind image */}
          <View style={styles.heroBg} />
          <View style={styles.heroGlow} />

          {/* Back arrow
          <TouchableOpacity
            style={styles.backArrow}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backArrowIcon}>‹</Text>
          </TouchableOpacity> */}

          {/* Category pill top-right */}
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>{product.category}</Text>
          </View>

          <Image source={{ uri: product.image }} style={styles.heroImage} />
        </Animated.View>

        {/* ── Content Sheet ── */}
        <Animated.View
          style={[
            styles.sheet,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* Handle */}
          <View style={styles.handle} />

          {/* Title row */}
          <Text style={styles.title}>{product.title}</Text>

          {/* Price + Rating row */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            <View style={styles.ratingChip}>
              <Text style={styles.ratingChipStar}>★</Text>
              <Text style={styles.ratingChipScore}>{product.rating.rate}</Text>
            </View>
          </View>

          {/* Star visual + review count */}
          <View style={styles.starMeta}>
            <StarRating rate={product.rating.rate} />
            <Text style={styles.reviewCount}>{product.rating.count} reviews</Text>
          </View>

          {/* Tags */}
          <View style={styles.tagsRow}>
            <Pill label="Free Shipping" />
            <Pill label="In Stock" />
            <Pill label={product.category} />
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Description */}
          <Text style={styles.sectionLabel}>About this item</Text>
          <Text style={styles.description}>{product.description}</Text>

        </Animated.View>
      </ScrollView>
    </View>
  );
};

/* ─────────────────────────────────────────────
   Styles
───────────────────────────────────────────── */
const ACCENT  = '#5B4FE9';
const ACCENT2 = '#8B82FF';
const BG      = '#F6F7FB';
const CARD    = '#FFFFFF';
const TEXT1   = '#12121A';
const TEXT2   = '#6B6E85';
const GOLD    = '#F5A623';
const RADIUS  = 28;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 48,
  },

  // ── Hero ──────────────────────────────────
  heroWrapper: {
    width: '100%',
    height: height * 0.42,
    backgroundColor: CARD,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: RADIUS + 4,
    borderBottomRightRadius: RADIUS + 4,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 20,
      },
      android: { elevation: 10 },
    }),
  },
  heroBg: {
    position: 'absolute',
    width: 340,
    height: 340,
    borderRadius: 170,
    backgroundColor: '#EEECFF',
    top: '5%',
    alignSelf: 'center',
  },
  heroGlow: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#D8D4FF',
    opacity: 0.6,
    bottom: '15%',
    right: '10%',
  },
  backArrow: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 54 : 36,
    left: 20,
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: { elevation: 4 },
    }),
  },
  backArrowIcon: {
    fontSize: 28,
    color: TEXT1,
    lineHeight: 32,
    marginTop: -2,
  },
  heroBadge: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 54 : 36,
    right: 20,
    backgroundColor: ACCENT,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 7,
    zIndex: 10,
  },
  heroBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  heroImage: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
    zIndex: 1,
  },

  // ── Sheet ─────────────────────────────────
  sheet: {
    marginTop: -RADIUS,
    backgroundColor: CARD,
    borderTopLeftRadius: RADIUS,
    borderTopRightRadius: RADIUS,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
    // no shadow needed — it's flush with content
  },
  handle: {
    alignSelf: 'center',
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E0E0EA',
    marginBottom: 20,
  },

  // ── Title / Price ─────────────────────────
  title: {
    fontSize: 19,
    fontWeight: '800',
    color: TEXT1,
    lineHeight: 27,
    marginBottom: 14,
    letterSpacing: -0.3,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  price: {
    fontSize: 30,
    fontWeight: '900',
    color: ACCENT,
    letterSpacing: -0.5,
  },
  ratingChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8EC',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
  },
  ratingChipStar: {
    fontSize: 14,
    color: GOLD,
  },
  ratingChipScore: {
    fontSize: 14,
    fontWeight: '700',
    color: '#7A5500',
  },

  // ── Stars ─────────────────────────────────
  starMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  starContainer: {
    width: 20,
    height: 20,
    position: 'relative',
  },
  star: {
    fontSize: 18,
    lineHeight: 20,
    position: 'absolute',
  },
  starEmpty: {
    color: '#DDD',
  },
  starFull: {
    color: GOLD,
  },
  starOverlay: {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  },
  reviewCount: {
    fontSize: 13,
    color: TEXT2,
  },

  // ── Tags ──────────────────────────────────
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  pill: {
    backgroundColor: '#F0EEFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
    color: ACCENT,
    textTransform: 'capitalize',
  },

  // ── Divider ───────────────────────────────
  divider: {
    height: 1,
    backgroundColor: '#F0F0F6',
    marginVertical: 18,
  },

  // ── Section Label ─────────────────────────
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: TEXT2,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 10,
  },

  // ── Description ───────────────────────────
  description: {
    fontSize: 14.5,
    color: TEXT2,
    lineHeight: 23,
  },

  // ── Quantity ──────────────────────────────
  qtyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0EEFF',
    borderRadius: 14,
    paddingVertical: 4,
    paddingHorizontal: 6,
    gap: 2,
  },
  qtyBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: CARD,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: { shadowColor: '#aaa', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 3 },
      android: { elevation: 2 },
    }),
  },
  qtyBtnText: {
    fontSize: 18,
    fontWeight: '700',
    color: ACCENT,
    lineHeight: 22,
  },
  qtyValue: {
    width: 36,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: TEXT1,
  },

  // ── CTA Buttons ───────────────────────────
  primaryBtn: {
    marginTop: 24,
    backgroundColor: ACCENT,
    borderRadius: 16,
    paddingVertical: 17,
    alignItems: 'center',
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: ACCENT,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 14,
      },
      android: { elevation: 8 },
    }),
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  secondaryBtn: {
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: ACCENT2,
    marginBottom: 4,
  },
  secondaryBtnText: {
    color: ACCENT,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});

export default ProductDetailScreen;