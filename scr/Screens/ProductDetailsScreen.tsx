import { Dimensions, Image, NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RootStackParamlist } from '../Type'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONT_FAMILY, ProductDataSample } from '../Constants/Index'
import { ArrowLeft, DollarSign, Star } from 'lucide-react-native'
import PagerView, { PagerViewOnPageSelectedEventData } from 'react-native-pager-view';
import PaymentFooter from '../componants/PaymentFooter'
import { MotiText, MotiView } from 'moti'
import { MotiPressable } from 'moti/interactions'
import { useAppDispatch } from '../store'

type ProductDetailsScreenProp = RouteProp<RootStackParamlist, 'ProductDetail'>
const ProductDetailsScreen = () => {
  const route = useRoute<ProductDetailsScreenProp>()
  const [CurrentPage, setCurrentPage] = useState(0)
  const [size, setSize] = useState('S')
  const { _id } = route.params
  const [loading, setLoading] = useState(false)
  const Tab = [1, 2]
  const pagerViewRef = useRef<PagerView>(null)
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const onePageSelectd = (e: NativeSyntheticEvent<PagerViewOnPageSelectedEventData>) => {
    setCurrentPage(e.nativeEvent.position)
  }
  // dummy data
  const productItem = ProductDataSample.filter(item => item._id === _id)[0]

  const animatedTitle = [...productItem.name.split(" "), '"'].filter(word => word !== '"')
  const [price, setPrice] = useState(productItem.prices[0])

  // animation
  const [step, setStep] = useState(0)
  // small delay before creating first animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setStep(1)
    }, 200)
    return () => clearTimeout(timer)
  }, [])

  // add item to the cart
  const handleAddItemToTheCart = (product: any, size: string) => {
    setLoading(true)
    dispatch({
      type: 'cart/addToCart',
      payload: {
        ...product,
        selectedSize: size
      }
    })
    navigation.navigate('MainTabs', { screen: 'Cart' })
    setLoading(false)
  }

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <View>
          {/* header & img slider */}
          <MotiView
            from={{ opacity: 0, translateY: 15 }}
            animate={{ opacity: 1, translateY: 0 }}
            onDidAnimate={(key, finished) => {
              if (key === 'opacity' && finished && step === 1) {
                setStep(2) // trigger next step
              }
            }}

          >
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.BackButton}>
              <ArrowLeft
                color={COLORS.primaryLightGrey}
                size={15}

              />
            </TouchableOpacity>

            {/* <View style={styles.ArrowContainer}>
        <ArrowLeft size={25} strokeWidth={1.25} color={COLORS.primaryBlack} />
      </View> */}
            {/* <View > */}
            <PagerView style={styles.PagerViewContainer} ref={pagerViewRef} initialPage={0} onPageSelected={onePageSelectd}>

              <View
                key={0}
              >
                <Image
                  source={{ uri: productItem.images[0] }}
                  style={styles.image}
                  resizeMode='cover'
                />
              </View>

              <View
                key={1}

              >
                <Image
                  source={{ uri: productItem.images[1] }}
                  style={styles.image}
                  resizeMode='cover'
                />
              </View>

            </PagerView>
            {/* </View> */}

            <View style={styles.ScrollIndicatorStyle}>
              {Tab.map((_, index) => {
                return (
                  <TouchableOpacity key={index} style={{
                    ...styles.buttons,
                    // borderColor: COLORS.primaryBlack,
                    backgroundColor: CurrentPage == index ? 'blue' : '#fff',
                    width: CurrentPage == index ? 32 : 14
                  }} ></TouchableOpacity>
                )
              })}
            </View>

          </MotiView>
          {/* rating & price */}
          <MotiView
            from={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: step >= 2 ? 1 : 0, scale: step >= 2 ? 1 : 0.5 }}
            onDidAnimate={(key, finished) => {
              if (key === 'opacity' && finished && step === 2) {
                setStep(3) // trigger next step
              }
            }}
            transition={{
              type: 'spring',
              damping: 20,
              stiffness: 50,
              delay: 300,
            }}
            style={styles.RatingContainer}>
            <View style={styles.RatingValueContainer}>
              <Star
                color={COLORS.primaryOrange}
                size={16}
              />
              <Text style={styles.RatingText} >{productItem.average_rating}</Text>
            </View>
            <Text style={styles.CardPriceCurrency}>
              $ <Text style={styles.CardPriceAmount}>{productItem.prices[0].price}</Text>
            </Text>
          </MotiView>
          <View style={styles.TitleContainer}>
            {animatedTitle.map((text, index) => {
              return (
                <MotiView
                  key={index}
                  from={{
                    opacity: 0,
                    translateY: 10,
                  }}
                  animate={{
                    opacity: step >= 3 ? 1 : 0,
                    translateY: step >= 3 ? 0 : 10,
                  }}
                  transition={{
                    type: 'spring',
                    delay: index * 250,
                  }}
                  onDidAnimate={(key, finished) => {
                    if (key === 'opacity' && finished && step === 3) {
                      setStep(4) // trigger next step
                    }
                  }}
                >
                  <Text style={styles.titleText}>
                    {text}
                  </Text>
                </MotiView>
              );
            })}
          </View>
          {/* desc & size */}
          <View style={styles.FooterInfoArea}>
            {/* desc title */}
            <MotiText
              from={{
                opacity: 0,
                translateY: 10,
              }}
              animate={{
                opacity: step >= 4 ? 1 : 0,
                translateY: step >= 4 ? 0 : 10,
              }}
              transition={{
                type: 'spring',
                delay: 250,
              }}
              onDidAnimate={(key, finished) => {
                if (key === 'opacity' && finished && step === 4) {
                  setStep(5) // trigger next step
                }
              }}
              style={styles.InfoTitle}
            >
              Description
            </MotiText>
            <MotiText
              from={{
                opacity: 0,
              }}
              animate={{
                opacity: step >= 5 ? 1 : 0,
              }}
              transition={{
                type: 'spring',
              }}
              onDidAnimate={(key, finished) => {
                if (key === 'opacity' && finished && step === 5) {
                  setStep(6) // trigger next step
                }
              }}
              style={styles.DescText}>
              {productItem.description}
            </MotiText>
            {/* size */}
            <MotiText
              from={{
                opacity: 0,
                translateY: 10,
              }}
              animate={{
                opacity: step >= 6 ? 1 : 0,
                translateY: step >= 6 ? 0 : 10,
              }}
              transition={{
                type: 'spring',
                delay: 250,
              }}
              onDidAnimate={(key, finished) => {
                if (key === 'opacity' && finished && step === 6) {
                  setStep(7) // trigger next step
                }
              }}
              style={styles.InfoTitle}
            >
              Size
            </MotiText>
            {/* size selection */}
            <View style={styles.SizeOuterContainer}>
              {productItem.prices.map((item, index) => (
                <MotiPressable
                  from={{
                    opacity: 0,
                    translateY: 10,

                  }}
                  animate={{
                    opacity: step >= 7 ? 1 : 0,
                    translateY: step >= 7 ? 0 : 10,

                  }}
                  transition={{
                    type: 'spring',
                    delay: index * 250,
                  }}
                  // onDidAnimate={(key, finished) => {
                  //     if (key === 'opacity' && finished && step === 3) {
                  //         setStep(4) // trigger next step
                  //     }
                  // }}

                  onPress={() => { setPrice(item) }}

                  style={[styles.SizeBox, { borderColor: item.size === price.size ? COLORS.primaryOrange : COLORS.primaryGrey }]}
                  key={index}>
                  <Text style={[styles.SizeTextBox, { color: item.size === price.size ? COLORS.primaryOrange : COLORS.primaryGrey }]}> {item.size} </Text>
                </MotiPressable>
              ))}
            </View>
          </View>
        </View>

        <PaymentFooter
          price={price.price}
          onPress={() => handleAddItemToTheCart(productItem, price.size)}
          buttonTitle={"Add To Cart"}
          loading={loading}
        />
      </ScrollView>

      {/* rating section */}

    </SafeAreaView>
  )
}

export default ProductDetailsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryWhite
  },
  image: {
    width: "100%",
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },

  buttons: {
    borderRadius: 8,
    width: 35,
    height: 14,
    marginHorizontal: 7,
  },


  // new elements
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryWhite
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  BackButton: {
    marginTop: 10,
    position: 'absolute',
    padding: 12,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryWhite,
    borderColor: COLORS.primaryOrange,
    borderWidth: 2,
    borderRadius: 12,
    top: -3,
    left: 15,

  },
  RatingContainer: {
    marginHorizontal: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLORS.BlackRGBA30,
  },
  RatingValueContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10

  },
  RatingText: {
    fontFamily: FONT_FAMILY.poppins_medium,
    color: COLORS.primaryLightGrey,
    fontSize: 14,
  },
  CardPriceCurrency: {
    fontFamily: FONT_FAMILY.poppins_semibold,
    color: COLORS.primaryOrange,
    fontSize: 18,
  },
  CardPriceAmount: {
    color: COLORS.primaryBlack,
    fontSize: 25
  },
  titleText: {
    fontSize: 22,
    fontFamily: FONT_FAMILY.poppins_semibold,
    color: COLORS.primaryBlack,
    paddingLeft: 5
  },
  TitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    rowGap: 3,
    flexWrap: 'wrap',
    paddingTop: 8,
    paddingHorizontal: 10
  },
  FooterInfoArea: {
    padding: 20
  },
  InfoTitle: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.poppins_semibold,
    color: COLORS.primaryBlack,
    marginTop: 18,
  },
  DescText: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.poppins_regular,
    color: COLORS.primaryGrey,
    marginTop: 3,
    // letterSpacing: 0.5
  },
  SizeOuterContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    marginTop: 8
  },
  SizeBox: {
    flex: 1,
    backgroundColor: COLORS.primaryVeryWhite,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
    width: Dimensions.get('window').width * 0.26
  },
  SizeTextBox: {
    fontFamily: FONT_FAMILY.poppins_medium,
  },
  PagerViewContainer: {
    height: Dimensions.get('window').height * 0.35,
    marginHorizontal: 12
  },
  ScrollIndicatorStyle:
  {
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'center'
  }
})

{/*<View style={styles.containerRating}>
        <View style={styles.RatingElement}>
          <Star
            color={COLORS.primaryOrange}
            size={16}
          />
          <Text>
            {productItem[0].average_rating}
          </Text>
        </View>
        <View style={styles.RatingElement}>
          <DollarSign
            color={COLORS.primaryOrange}
            size={16} />
          <Text>
            {productItem[0].prices.find(item => item.size === size)?.price}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '5%', }}>
        <Pressable style={[styles.buttonSize, { borderColor: size === 'S' ? COLORS.primaryOrange : '#000' }]}
          onPress={() => { setSize('S') }}
        >
          <Text> S</Text>
        </Pressable>
        <Pressable style={[styles.buttonSize, { borderColor: size === 'M' ? COLORS.primaryOrange : '#000' }]}
          onPress={() => { setSize('M') }}
        >
          <Text> M</Text>
        </Pressable>
        <Pressable style={[styles.buttonSize, { borderColor: size === 'L' ? COLORS.primaryOrange : '#000' }]}
          onPress={() => { setSize('L') }}
        >
          <Text> L</Text>
        </Pressable>
      </View>*/}