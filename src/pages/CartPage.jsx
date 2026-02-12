import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  ShoppingCart, Trash2, ArrowLeft, CreditCard,
  Ticket, Calendar, Clock, MapPin, Users, CheckCircle,
  AlertCircle, Shield, Lock, Upload, QrCode, Copy,
  Camera, X, RotateCw, Download, Receipt, Banknote,
  Smartphone, Wallet, ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useEffect } from 'react';

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    clearCart,
    getCartTotal,
    checkout,
    isLoading,
    MAX_EVENTS,
    getRemainingSlots
  } = useCart();

  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [upiId, setUpiId] = useState('');
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formError, setFormError] = useState('');
  const [imgUrl, setImgurl] = useState("");
  const fileInputRef = useRef(null);
  const wid = useRef()

  const totalAmount = getCartTotal();
  const remainingSlots = getRemainingSlots();
  const isCartFull = cart.length === MAX_EVENTS;

  // Static UPI ID for payment
  const sparkzUPI = 'sparkz26@upi';
  useEffect(() => {
    const widget = cloudinary.createUploadWidget(
      {
        cloudName: 'dfseckyjx',
        uploadPreset: 'qbvu3y5j',
        multiple: false
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          const url = result.info.secure_url;
          setImgurl(url)
        }
      }
    );
    wid.current = widget
  }, [])
  const handleFileUpload = (e) => {
    wid.current.open()
  };

  // Remove uploaded screenshot
  const removeScreenshot = () => {
    setPaymentScreenshot(null);
    setScreenshotPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Copy UPI ID to clipboard
  const copyUPI = () => {
    navigator.clipboard.writeText(sparkzUPI);
    // Show success toast (you can add toast notification here)
    alert('UPI ID copied to clipboard!');
  };

  // Open UPI app directly
  const openUPIApp = () => {
    // This will attempt to open UPI app with payment details
    const upiLink = `upi://pay?pa=${sparkzUPI}&pn=SPARKZ%2026&am=${totalAmount}&tn=Sparkz%20Events%20Payment&cu=INR`;
    window.location.href = upiLink;
  };

  // Copy transaction details
  const copyTransactionDetails = () => {
    const details = `
      Event Registration Payment Details:
      - Total Amount: ₹${totalAmount}
      - Events: ${cart.map(e => e.title).join(', ')}
      - Payment to: SPARKZ 2026
      - UPI ID: ${sparkzUPI}
    `;
    navigator.clipboard.writeText(details);
    alert('Transaction details copied!');
  };

  // Handle form submission
  const handleSubmitPayment = async (e) => {
    e.preventDefault();

    if (!transactionId.trim()) {
      setFormError('Please enter Transaction ID');
      return;
    }

    if (!imgUrl) {
      setFormError('Please upload payment screenshot');
      return;
    }

    setIsUploading(true);
    setFormError('');

    axios.post("https://sparkz-server.onrender.com/user/event/normal", {
      transactionId,
      paymentScreenshot: imgUrl,
      event: cart,
      user: JSON.parse(localStorage.getItem("sparkz_user"))
    }).then((res) => {
      console.log(res.data);
      clearCart();
      setShowCheckoutForm(false);
      navigate("/")
    }).catch((err) => {
      console.error(err);
    })
  };

  // Handle checkout button click
  const handleCheckoutClick = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    setShowCheckoutForm(true);
  };

  // Close checkout form
  const closeCheckoutForm = () => {
    setShowCheckoutForm(false);
    setFormError('');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-amber-500/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-red-500/10 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Events</span>
          </Link>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-amber-600/20 to-red-600/20 rounded-xl border border-amber-500/30">
                <ShoppingCart className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">Your Cart</h1>
                <p className="text-gray-400">Review and checkout your selected events</p>
              </div>
            </div>

            {cart.length > 0 && !showCheckoutForm && (
              <button
                onClick={clearCart}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600/20 to-rose-600/20 hover:from-red-600/30 hover:to-rose-600/30 rounded-lg border border-red-500/30 text-red-400 hover:text-red-300 transition-all"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>

        {/* Checkout Form Overlay */}
        {showCheckoutForm && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-20"
              onClick={closeCheckoutForm}
            />

            {/* Checkout Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-full max-w-2xl"
            >
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-amber-500/30 shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-amber-500/30 bg-gradient-to-r from-amber-900/20 to-red-900/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-6 h-6 text-amber-400" />
                      <h2 className="text-xl font-bold">Complete Payment</h2>
                    </div>
                    <button
                      onClick={closeCheckoutForm}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">
                    Complete your payment to confirm registration
                  </p>
                </div>

                <form onSubmit={handleSubmitPayment} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                  {/* QR Code Section */}
                  <div className="text-center">
                    <div className="inline-block p-4 bg-gradient-to-br from-black/60 to-gray-900/60 rounded-xl border border-amber-500/30">
                      <div className="mb-3">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <QrCode className="w-5 h-5 text-amber-400" />
                          <span className="font-bold">Scan to Pay</span>
                        </div>
                        <div className="text-sm text-gray-400 mb-3">
                          Scan QR code with any UPI app
                        </div>
                      </div>

                      {/* QR Code Image Container */}
                      <div className="p-4 bg-white rounded-lg inline-block mb-3">
                        <div className="relative w-48 h-48 flex items-center justify-center">
                          {/* This is where you would place your QR code image */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-black text-sm font-bold mb-2">SPARKZ'26</div>
                              {/* Replace this div with your actual QR code image */}
                              <div className="w-40 h-40 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                  <QrCode className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                                  <div className="text-gray-500 text-xs">
                                    {/* Instructions for actual QR image */}
                                    {/* Replace with: <img src="/path/to/your-qr-code.png" alt="Payment QR Code" /> */}
                                    Place your QR code image here
                                  </div>
                                </div>
                              </div>
                              <div className="mt-2 text-black text-xs font-bold">
                                UPI ID: {sparkzUPI}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Payment Amount and Actions */}
                      <div className="mt-4">
                        <div className="flex items-center justify-center gap-2 text-lg font-bold text-amber-400 mb-3">
                          <Banknote className="w-5 h-5" />
                          <span>Amount: ₹{totalAmount}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={copyUPI}
                            className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-amber-600/20 to-red-600/20 rounded-lg border border-amber-500/30 text-amber-400 hover:text-amber-300 transition-colors text-sm"
                          >
                            <Copy className="w-3 h-3" />
                            <span>Copy UPI ID</span>
                          </button>
                          <button
                            type="button"
                            onClick={openUPIApp}
                            className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg border border-blue-500/30 text-blue-400 hover:text-blue-300 transition-colors text-sm"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Open UPI App</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Instructions */}
                  <div className="p-4 bg-gradient-to-r from-blue-900/10 to-cyan-900/10 rounded-xl border border-blue-500/20">
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                      <Receipt className="w-4 h-4" />
                      Payment Instructions
                    </h3>
                    <ol className="text-sm text-gray-400 space-y-1 pl-5 list-decimal">
                      <li>Scan QR code with any UPI app <span className="text-amber-400">(Google Pay, PhonePe, Paytm, etc.)</span></li>
                      <li>Enter amount: <span className="font-bold text-amber-400">₹{totalAmount}</span></li>
                      <li>Add description: <span className="text-amber-400">SPARKZ Events Registration</span></li>
                      <li>Complete payment in your UPI app</li>
                      <li>Take a screenshot of payment confirmation</li>
                      <li>Upload screenshot below and enter transaction details</li>
                    </ol>
                  </div>

                  {/* Quick Payment Methods */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-3 bg-gradient-to-r from-green-900/10 to-emerald-900/10 rounded-lg border border-green-500/20">
                      <Smartphone className="w-5 h-5 text-green-400 mx-auto mb-1" />
                      <div className="text-xs text-gray-300">Google Pay</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-r from-blue-900/10 to-cyan-900/10 rounded-lg border border-blue-500/20">
                      <Wallet className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                      <div className="text-xs text-gray-300">PhonePe</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-r from-purple-900/10 to-pink-900/10 rounded-lg border border-purple-500/20">
                      <Banknote className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                      <div className="text-xs text-gray-300">Paytm</div>
                    </div>
                  </div>

                  {/* Transaction Details Form */}
                  <div className="space-y-4">
                    <h3 className="font-bold flex items-center gap-2">
                      <Lock className="w-4 h-4 text-amber-400" />
                      Payment Verification
                    </h3>

                    {/* Transaction ID */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Transaction ID / UTR Number *
                        <span className="text-amber-400 text-xs ml-2">(From payment app)</span>
                      </label>
                      <input
                        type="text"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        placeholder="Enter transaction ID from your payment app"
                        className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Found in payment confirmation or bank statement
                      </p>
                    </div>

                    {/* UPI ID (Optional) */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Your UPI ID (Optional)
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="e.g., yourname@upi"
                        className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Payment Screenshot Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Payment Screenshot *
                        <span className="text-amber-400 text-xs ml-2">(Required for verification)</span>
                      </label>

                      {imgUrl ? (
                        <div className="relative">
                          <div className="border-2 border-dashed border-amber-500/30 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2 text-amber-400">
                                <Camera className="w-4 h-4" />
                                <span className="text-sm">Screenshot Uploaded</span>
                              </div>
                              <button
                                type="button"
                                onClick={removeScreenshot}
                                className="text-red-400 hover:text-red-300"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="relative">
                              <img
                                src={imgUrl}
                                alt="Payment screenshot"
                                className="w-full h-48 object-contain rounded-lg bg-black/50"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                                <button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="px-4 py-2 bg-gradient-to-r from-amber-600 to-red-600 rounded-lg text-white text-sm"
                                >
                                  Change Image
                                </button>
                              </div>
                            </div>
                            <div className="text-xs text-gray-500 mt-2">
                              {imgUrl?.name} • {(imgUrl?.size / 1024).toFixed(2)} KB
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="border-2 border-dashed border-amber-500/30 rounded-xl p-8 text-center cursor-pointer hover:border-amber-500/50 transition-colors"
                        >
                          <Upload className="w-12 h-12 text-amber-500/50 mx-auto mb-3" />
                          <div className="text-amber-400 font-medium mb-2">
                            Upload Payment Screenshot
                          </div>
                          <p className="text-gray-500 text-sm">
                            Click to upload screenshot of payment confirmation
                          </p>
                          <p className="text-gray-600 text-xs mt-2">
                            Supports: JPG, PNG • Max: 5MB
                          </p>
                        </div>
                      )}

                      <div
                        ref={fileInputRef}
                        onClick={handleFileUpload}
                        className="hidden"
                      />
                    </div>

                    {/* Error Message */}
                    {formError && (
                      <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <div className="flex items-center gap-2 text-red-400">
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-sm">{formError}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={closeCheckoutForm}
                      className="flex-1 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      onClick={handleSubmitPayment}
                      disabled={isUploading || !transactionId || !imgUrl}
                      className={`flex-1 py-3 rounded-xl font-bold transition-all ${isUploading || !transactionId || !imgUrl
                        ? 'bg-gray-800 cursor-not-allowed text-gray-400'
                        : 'bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 hover:shadow-2xl hover:shadow-amber-500/20 active:scale-95'
                        }`}
                    >
                      {isUploading ? (
                        <div className="flex items-center justify-center gap-2">
                          <RotateCw className="w-5 h-5 animate-spin" />
                          <span>Verifying Payment...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-3">
                          <CheckCircle className="w-5 h-5" />
                          <span>Confirm Payment</span>
                        </div>
                      )}
                    </button>
                  </div>

                  {/* Security Note */}
                  <div className="text-center pt-4 border-t border-gray-800">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      <Shield className="w-4 h-4" />
                      <span>Your payment is secured with 256-bit SSL encryption</span>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2">
            {/* Cart Status */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isCartFull ? 'bg-red-500/10' : 'bg-amber-500/10'}`}>
                    <Ticket className={`w-5 h-5 ${isCartFull ? 'text-red-400' : 'text-amber-400'}`} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Selected Events ({cart.length}/{MAX_EVENTS})</h2>
                    <p className="text-sm text-gray-400">
                      {isCartFull ? 'Cart is full' : `${remainingSlots} more event${remainingSlots !== 1 ? 's' : ''} can be added`}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-32">
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(cart.length / MAX_EVENTS) * 100}%` }}
                      className={`h-full rounded-full ${isCartFull ? 'bg-red-500' : 'bg-gradient-to-r from-amber-500 to-red-500'
                        }`}
                    />
                  </div>
                  <div className="text-xs text-gray-400 text-center mt-1">
                    {cart.length}/{MAX_EVENTS}
                  </div>
                </div>
              </div>

              {/* Warning if cart is full */}
              {isCartFull && (
                <div className="p-4 bg-gradient-to-r from-red-900/20 to-rose-900/20 rounded-lg border border-red-500/30 mb-4">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <div>
                      <p className="text-red-300 font-medium">Cart Limit Reached</p>
                      <p className="text-red-400/80 text-sm">
                        You can only select {MAX_EVENTS} events at a time. Remove an event to add another.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="text-center py-16 bg-gradient-to-br from-black/40 to-gray-900/40 rounded-2xl border border-amber-500/20">
                <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Your cart is empty</h3>
                <p className="text-gray-400 mb-6">Add events from the events page to get started</p>
                <Link
                  to="/events"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-red-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Browse Events</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((event, index) => (
                  <CartEventCard
                    key={event.id}
                    event={event}
                    index={index}
                    onRemove={() => removeFromCart(event.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Checkout Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-gradient-to-br from-black/60 to-gray-900/60 backdrop-blur-sm rounded-2xl border border-amber-500/30 p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-amber-400" />
                  <span>Order Summary</span>
                </h3>

                {/* Order Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Events</span>
                    <span className="font-medium">{cart.length} events</span>
                  </div>

                  {cart.map((event) => (
                    <div key={event.id} className="flex justify-between items-center text-sm">
                      <span className="text-gray-400 truncate pr-2">{event.title}</span>
                      <span className="text-amber-300 font-medium flex-shrink-0">
                        {event.price || 'Free'}
                      </span>
                    </div>
                  ))}

                  <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total Amount</span>
                    <span className="text-2xl text-amber-400">₹{totalAmount}</span>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-6 p-4 bg-gradient-to-r from-amber-900/10 to-red-900/10 rounded-lg border border-amber-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <QrCode className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-300 font-medium">UPI Payment</span>
                  </div>
                  <div className="text-sm text-gray-400 space-y-2">
                    <div className="flex items-center justify-between">
                      <span>UPI ID:</span>
                      <code className="text-amber-300 font-mono">{sparkzUPI}</code>
                    </div>
                    <button
                      onClick={copyTransactionDetails}
                      className="w-full mt-2 py-2 bg-gradient-to-r from-amber-600/20 to-red-600/20 rounded-lg border border-amber-500/30 text-amber-400 hover:text-amber-300 transition-colors text-sm flex items-center justify-center gap-2"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy Payment Details</span>
                    </button>
                  </div>
                </div>

                {/* Security Features */}
                <div className="mb-6 p-4 bg-gradient-to-r from-green-900/10 to-emerald-900/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span className="text-green-300 font-medium">Secure Checkout</span>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-center gap-2">
                      <Lock className="w-3 h-3 text-green-400" />
                      <span>SSL encrypted payment</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      <span>Instant confirmation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="w-3 h-3 text-green-400" />
                      <span>24/7 customer support</span>
                    </li>
                  </ul>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckoutClick}
                  disabled={cart.length === 0 || isLoading}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${cart.length === 0 || isLoading
                    ? 'bg-gray-800 cursor-not-allowed text-gray-400'
                    : 'bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 hover:shadow-2xl hover:shadow-amber-500/20 active:scale-95'
                    }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <CreditCard className="w-5 h-5" />
                      <span>Proceed to Payment</span>
                    </div>
                  )}
                </button>

                {/* Terms */}
                <p className="text-center text-xs text-gray-500 mt-4">
                  By proceeding, you agree to our Terms & Conditions
                </p>
              </div>

              {/* Need Help */}
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-900/10 to-cyan-900/10 rounded-lg border border-blue-500/20">
                <p className="text-sm text-gray-400 text-center">
                  Need help? <span className="text-blue-400 cursor-pointer hover:text-blue-300">Contact Support</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Cart Event Card Component
const CartEventCard = ({ event, index, onRemove }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gradient-to-r from-black/40 to-gray-900/40 rounded-xl border border-amber-500/20 p-4"
    >
      <div className="flex items-start gap-4">
        {/* Event Number */}
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-amber-600 to-red-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">{index + 1}</span>
        </div>

        {/* Event Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-bold text-lg text-white truncate">{event.title}</h4>
            <button
              onClick={onRemove}
              className="flex-shrink-0 p-2 hover:bg-red-500/10 rounded-lg transition-colors"
              aria-label="Remove from cart"
            >
              <Trash2 className="w-4 h-4 text-red-400 hover:text-red-300" />
            </button>
          </div>

          <p className="text-amber-300 text-sm mb-3 line-clamp-2">{event.tagline}</p>

          {/* Event Info Grid */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3 text-gray-400" />
              <span className="text-gray-300">{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-gray-400" />
              <span className="text-gray-300">{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 text-gray-400" />
              <span className="text-gray-300 truncate">{event.venue}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-3 h-3 text-gray-400" />
              <span className="text-gray-300">{event.seats}</span>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="flex-shrink-0">
          <div className="px-3 py-2 bg-gradient-to-r from-amber-600/20 to-red-600/20 rounded-lg border border-amber-500/30">
            <span className="text-amber-400 font-bold text-lg">{event.price || 'Free'}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartPage;