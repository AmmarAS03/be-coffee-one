const OrderSchema = {
    coffee_name: String,
    quantity: Number,
    name: String,
    email: String,
    delivery_option: String,
    building: String,
    room_location: String,
    selected_time: String,
    order_date: Date,
    created_at: Date,
    notes: String,
  };
  
  module.exports = { OrderSchema };