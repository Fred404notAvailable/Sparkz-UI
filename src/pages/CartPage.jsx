import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, Trash2, ArrowLeft, CreditCard, 
  Ticket, Calendar, Clock, MapPin, Users, CheckCircle,
  AlertCircle, Shield, Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

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

  const totalAmount = getCartTotal();
  const remainingSlots = getRemainingSlots();
  const isCartFull = cart.length === MAX_EVENTS;

  // Handle checkout
  const handleCheckout = async () => {
    await checkout();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-amber-500/10 to-transparent" />
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

            {cart.length > 0 && (
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
                      className={`h-full rounded-full ${
                        isCartFull ? 'bg-red-500' : 'bg-gradient-to-r from-amber-500 to-red-500'
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
                  onClick={handleCheckout}
                  disabled={cart.length === 0 || isLoading}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                    cart.length === 0 || isLoading
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