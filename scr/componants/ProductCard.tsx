import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ProductCardType } from '../Type'
import { Plus, Star } from 'lucide-react-native'
import { COLORS, FONT_FAMILY } from '../Constants/Index'
import LinearGradient from 'react-native-linear-gradient'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

const IMAGE_WIDTH = Dimensions.get('window').width * 0.32

const ProductCard: React.FC<ProductCardType> = ({
    _id,
    image,
    name,
    brand,
    average_rate,
    price,
    onPress

}) => {
    // colors.PrimaryveryWhite colors.PrimaryveryWhite*40
    const opacity = useSharedValue(1)
    const AnimetedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)
    const animetedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value
        }
    })
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={[COLORS.primaryVeryWhite, COLORS.primaryVeryWhite + '40']}
            style={styles.linearGradient}
        >

            <ImageBackground
                source={{ uri: image }}
                style={styles.CardImage}
                resizeMode='cover'
            >

                <View style={styles.CardRatingContainer}>
                    <Star
                        color={COLORS.primaryOrange}
                        size={16}
                    />
                    <Text style={styles.CardRatingText}>
                        {average_rate}
                    </Text>
                </View>
            </ImageBackground>

            <View style={styles.CardDetailsWrapper}>
                <Text style={styles.CardTitle}>
                    {name.length >= 15 ? name.slice(0,15)+'...':name}
                </Text>
                <Text style={styles.CardBrandName}>
                    {brand}
                </Text>
                <View style={styles.CardFooterContainer}>
                    <Text style={styles.CardPriceCurrency}>
                        $ <Text style={styles.CardPriceAmount}>
                            {price}
                        </Text>
                    </Text>

                    <AnimetedTouchableOpacity
                        style={[animetedStyle, styles.AddToCardButton]}
                        onPress={onPress}

                    >
                        <Plus
                            color={COLORS.primaryVeryWhite}
                            size={20}
                        />
                    </AnimetedTouchableOpacity>
                </View>
            </View>

        </LinearGradient>
    )
}

export default ProductCard

const styles = StyleSheet.create({
    linearGradient: {
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 25,
        width: 175,
        minHeight: 300,
    },
    CardImage: {
        width: IMAGE_WIDTH,
        height: IMAGE_WIDTH,
        borderRadius: 20,
        marginBottom: 15,
        overflow: 'hidden',
    },
    AddToCardButton: {
        backgroundColor: COLORS.primaryOrange,
        padding: 7,
        borderRadius: 8
    },
    CardRatingContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.primaryBlackRGBA,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        paddingHorizontal: 15,
        position: 'absolute',
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 20,
        top: 0,
        right: 0,
    },
    CardRatingText: {
        fontFamily: FONT_FAMILY.poppins_medium,
        color: COLORS.primaryWhite,
        lineHeight: 22,
        fontSize: 14,
    },
    CardTitle: {
        fontFamily: FONT_FAMILY.poppins_medium,
        color: COLORS.primaryBlack,
        fontSize: 16,
    },
    CardBrandName: {
        fontFamily: FONT_FAMILY.poppins_light,
        color: COLORS.secondaryLightGrey,
        fontSize: 10,
    },
    CardFooterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 22
    },
    CardPriceCurrency: {
        fontFamily: FONT_FAMILY.poppins_semibold,
        color: COLORS.primaryOrange,
        fontSize: 18,
    },
    CardPriceAmount: {
        color: COLORS.primaryBlack,
    },
    CardDetailsWrapper: {
        paddingHorizontal: 18
    }
})