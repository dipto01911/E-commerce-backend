const { SaveCart, UpdateCart,
     RemoveCart, ReadCart } = require('../controller/CartController');
const { FeatureList } = require('../controller/FeatureController');
const { CreateInvoice, InvoiceList,
      PaymentSucess, InvoiceProductList, 
      PaymentCancel, PaymentIPN, 
      PaymentFail} = require('../controller/InvoiceController');


const { ReadBrandList, ReadCategoryList,ReadSliderList, ProductListByBrand,
ProductListByCategories,
ProductWithBrand_Cat,
ProductDetails,ProductFindByRemark,
ProductReview,
ProductFindByKeyword,
ProductCreateReview,
ProductReviewList
 } = require('../controller/ProductController');


const { UserLogin,UserVerify, UserLogout, CreateProfile,
     UpdateProfile,DeleteProfile, 
     ReadProfile} = require('../controller/UserController');


const { SaveWishList, ReadWishList, RemoveWishList } = require('../controller/WishListController');

     const { AuthVerify } = require('../middleware/Auth');

const router=require('express').Router()

//Product relate task

// 1.Read ProductBrandList from BrandModel

router.get('/ProductBrandList',ReadBrandList);

//2.Read ProductCategory form CategoryModel

router.get('/ProductCategoryList',ReadCategoryList)


//3.Read ProductSliderList from ProductSliderModel

router.get('/ProductSliderList',ReadSliderList)

//4.Find the product by their Associate BrandName from ProductModel and BrandModel

router.get('/ProductListByBrand/:BrandID',ProductListByBrand)

//5.Find the Product by their Associate CategoryName from ProductModel and CategoryModel
router.get('/ProductListByCategory/:CategoryID',ProductListByCategories)

// 6.Find the Product with their Brand and Categories from ProductModel and CategoryModel  
router.get('/ProductFind/:productID',ProductWithBrand_Cat)

//7.Find the the Product with their details from ProductModel,ProductDetailModel,BrandModel and CategoriesModel

router.get('/ProductDetails/:productID',ProductDetails)

//8.List by remark service by joining ProductModel with their Category and BrandModel

router.get('/ProductFindByRemark/:remark',ProductFindByRemark)

//9.Review List finding from ReviewModel and ProfileModel.which person review find person infromation

router.get('/ProductReview/:productId',ProductReview)

//10.List by key word from ProductModel with Joining Associate Product Brand and Category from BrandModel and CategoryModel
router.get('/ProductFindByKeyword/:Keyword',ProductFindByKeyword)



//userservice start from here

//1.Login the User with Eamil send an otp to the email by using an email utility function

router.get('/UserLogin/:email',UserLogin)

//2.Verify the user using Email and otp and after generate a token for using jwt

router.get('/Verify/:email/:otp',UserVerify)

//3.Logout User by expires cookies
router.get('/UserLogout',UserLogout)

//4.CreateUserProfile by using user_id and email from AuthVerify headers and insert data into ProfileModel

router.post('/CreateProfile',AuthVerify,CreateProfile)

//5.UpdateUser profile based on the user_id which are come from Authverify middleware headers

router.patch('/UpdateProfile',AuthVerify,UpdateProfile)

//6.ReadUser Profile based on the user_id which are come from AuthVerify middleware headers

router.get('/ReadProfile',AuthVerify,ReadProfile)

//7 Delete the Profile based on the user_id which are come from Authverify middleware headers
router.delete('/DeleteProfile',AuthVerify,DeleteProfile)

//WishList Routes

//1.Save Product into wish list where user_id are come from Authverify middleware headers
//if product is not there then insert if product are exist then update

router.post('/SaveWishList',AuthVerify,SaveWishList)

//2.Read all wish of the particular users
router.get('/ReadWishList',AuthVerify,ReadWishList);

//3.Remove a particular Product from the WishList where Product Id will be given by the user and particular user_id will be retreive from AuthVerify

router.post('/RemoveWishList',AuthVerify,RemoveWishList)

//CartList Routes

//1.Create Cart list for a particular user_id person where user_id ar comes from token and authverify middleware 

router.post('/SaveCartList',AuthVerify,SaveCart)

//2.Update Cart list by using Cart id
router.patch('/UpdateCartList/:CartId',AuthVerify,UpdateCart)

//3.Delete Cart from the Cart list by using Cart Id which are provide requestBody

router.post('/RemoveCartList',AuthVerify,RemoveCart)

//4.Read all Cart in the CartList

router.get('/ReadCartList',AuthVerify,ReadCart)


//Invoice & Payment routes 

router.get('/CreateInvoice',AuthVerify,CreateInvoice)
router.get('/InvoiceList',AuthVerify,InvoiceList)
router.get('/InvoiceProductList/:invoice_id',AuthVerify,InvoiceProductList)

//Pyment sucess,payment cancel,paymentIpn,paymentfail url.this url will be hit after ssl commerz transaction status

router.post('/PaymentSucess/:trxID',PaymentSucess)
router.get('/PaymentCancel/:trxID',PaymentCancel)
router.post('/PaymentIPN/:trxID',PaymentIPN)
router.post('/PaymentFail/:trxID',PaymentFail)

//Features related
router.get('/FeatureList',FeatureList)
 //Create Reviews

router.post('/CreateReview',AuthVerify,ProductCreateReview)
router.get('/ReviewList',ProductReviewList)
module.exports=router;