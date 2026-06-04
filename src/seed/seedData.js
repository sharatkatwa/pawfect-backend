const path = require("path");
const dns = require("dns");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const Cart = require("../models/cart.model");
const Order = require("../models/order.model");
const Product = require("../models/product.model");
const Review = require("../models/review.model");
const User = require("../models/user.model");
const Wishlist = require("../models/wishlist.model");

dotenv.config({ path: path.join(__dirname, "../../.env") });

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

const password = "Password@123";

const users = [
  {
    name: "Admin User",
    age: 32,
    email: "admin@example.com",
    phone: "9000000001",
    address: "Petpunk HQ, Ahmedabad",
    role: "seller",
    admin: true,
  },
  {
    name: "Aarav Sharma",
    age: 28,
    email: "aarav.seller@example.com",
    phone: "9876543210",
    address: "12 MG Road, Bengaluru",
    role: "seller",
  },
  {
    name: "Priya Nair",
    age: 31,
    email: "priya.seller@example.com",
    phone: "9765432109",
    address: "24 Marine Drive, Mumbai",
    role: "seller",
  },
  {
    name: "Kabir Mehta",
    age: 35,
    email: "kabir.seller@example.com",
    phone: "9654321098",
    address: "18 Park Street, Kolkata",
    role: "seller",
  },
  {
    name: "Ananya Rao",
    age: 24,
    email: "ananya.customer@example.com",
    phone: "9543210987",
    address: "41 Jubilee Hills, Hyderabad",
    role: "customer",
  },
  {
    name: "Rohan Iyer",
    age: 27,
    email: "rohan.customer@example.com",
    phone: "9432109876",
    address: "7 Anna Salai, Chennai",
    role: "customer",
  },
  {
    name: "Meera Singh",
    age: 29,
    email: "meera.customer@example.com",
    phone: "9321098765",
    address: "63 Civil Lines, Delhi",
    role: "customer",
  },
  {
    name: "Dev Patel",
    age: 33,
    email: "dev.customer@example.com",
    phone: "9210987654",
    address: "9 Ring Road, Ahmedabad",
    role: "customer",
  },
  {
    name: "Isha Kapoor",
    age: 26,
    email: "isha.customer@example.com",
    phone: "9109876543",
    address: "33 FC Road, Pune",
    role: "customer",
  },
  {
    name: "Nikhil Verma",
    age: 30,
    email: "nikhil.customer@example.com",
    phone: "9988776655",
    address: "5 Gomti Nagar, Lucknow",
    role: "customer",
  },
  {
    name: "Sara Thomas",
    age: 25,
    email: "sara.customer@example.com",
    phone: "9876501234",
    address: "14 Panampilly Nagar, Kochi",
    role: "customer",
  },
];

const image = (photoId) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1200&q=85`;

const productCatalog = [
  {
    productName: "Milo - Golden Retriever Puppy",
    description: "Three-month-old Golden Retriever puppy with a friendly temperament, first vaccination, deworming record, and veterinary health certificate.",
    category: "pet",
    petType: "dog",
    price: 32000,
    stock: 1,
    age: 3,
    breed: "Golden Retriever",
    gender: "male",
    isVaccinated: true,
    images: [image("photo-1552053831-71594a27632d")],
  },
  {
    productName: "Luna - Persian Kitten",
    description: "Four-month-old white Persian kitten that is litter trained, vaccinated, dewormed, and comfortable around families.",
    category: "pet",
    petType: "cat",
    price: 22000,
    stock: 1,
    age: 4,
    breed: "Persian",
    gender: "female",
    isVaccinated: true,
    images: [image("photo-1518791841217-8f162f1e1131")],
  },
  {
    productName: "Rio and Sky - Budgerigar Pair",
    description: "Healthy bonded budgerigar pair with bright plumage, active behavior, and a starter care guide for first-time bird parents.",
    category: "pet",
    petType: "bird",
    price: 3800,
    stock: 1,
    age: 8,
    breed: "Budgerigar",
    gender: "unknown",
    isVaccinated: false,
    images: [image("photo-1552728089-57bdde30beb3")],
  },
  {
    productName: "Snowy - Holland Lop Rabbit",
    description: "Gentle six-month-old Holland Lop rabbit with a clean health check, soft coat, and calm indoor temperament.",
    category: "pet",
    petType: "rabbit",
    price: 6500,
    stock: 1,
    age: 6,
    breed: "Holland Lop",
    gender: "female",
    isVaccinated: true,
    images: [image("photo-1585110396000-c9ffd4e4b308")],
  },
  {
    productName: "Peanut - Syrian Hamster",
    description: "Active golden Syrian hamster with a healthy coat and curious temperament, suitable for a properly sized solitary enclosure.",
    category: "pet",
    petType: "hamster",
    price: 1500,
    stock: 1,
    age: 3,
    breed: "Syrian Hamster",
    gender: "male",
    isVaccinated: false,
    images: [image("photo-1425082661705-1834bfd09dca")],
  },
  {
    productName: "Azure - Halfmoon Betta Fish",
    description: "Healthy blue Halfmoon Betta with vivid fins and active swimming behavior, best kept in a filtered and heated aquarium.",
    category: "pet",
    petType: "fish",
    price: 950,
    stock: 1,
    age: 6,
    breed: "Halfmoon Betta",
    gender: "male",
    isVaccinated: false,
    images: [image("photo-1522069169874-c58ec4b76be5")],
  },
  {
    productName: "Bella - Labrador Retriever Puppy",
    description: "Four-month-old Labrador Retriever puppy with vaccination record, deworming completed, and a playful family-friendly nature.",
    category: "pet",
    petType: "dog",
    price: 28000,
    stock: 1,
    age: 4,
    breed: "Labrador Retriever",
    gender: "female",
    isVaccinated: true,
    images: [image("photo-1558788353-f76d92427f16")],
  },
  {
    productName: "Simba - Siamese Cat",
    description: "One-year-old Siamese cat that is vaccinated, litter trained, social, and ready for a calm indoor home.",
    category: "pet",
    petType: "cat",
    price: 19000,
    stock: 1,
    age: 12,
    breed: "Siamese",
    gender: "male",
    isVaccinated: true,
    images: [image("photo-1573865526739-10659fec78a5")],
  },
  {
    productName: "Royal Canin Maxi Adult Dog Food 4kg",
    description: "Complete dry food formulated for adult large-breed dogs, with highly digestible proteins and support for bones and joints.",
    category: "food",
    petType: "dog",
    price: 2890,
    stock: 35,
    images: [image("photo-1589924691995-400dc9ecc119")],
  },
  {
    productName: "Whiskas Tuna Kitten Food 1.1kg",
    description: "Tuna-flavoured dry kitten food with balanced protein, vitamins, minerals, and calcium for healthy growth.",
    category: "food",
    petType: "cat",
    price: 520,
    stock: 48,
    images: [image("photo-1606214174585-fe31582dc6ee")],
  },
  {
    productName: "Vitapol Budgie Seed Mix 1.2kg",
    description: "Balanced daily seed blend for budgies with millet, grains, and selected seeds packed for freshness.",
    category: "food",
    petType: "bird",
    price: 495,
    stock: 42,
    images: [image("photo-1612170153139-6f881ff067e0")],
  },
  {
    productName: "Oxbow Western Timothy Hay 1.13kg",
    description: "High-fibre hand-sorted Timothy hay that supports digestive and dental health in rabbits and small herbivores.",
    category: "food",
    petType: "rabbit",
    price: 1499,
    stock: 24,
    images: [image("photo-1535241749838-299277b6305f")],
  },
  {
    productName: "TetraBits Complete Fish Food 93g",
    description: "Slow-sinking granules with balanced nutrients and colour-enhancing ingredients for discus and other tropical fish.",
    category: "food",
    petType: "fish",
    price: 525,
    stock: 60,
    images: [image("photo-1544551763-46a013bb70d5")],
  },
  {
    productName: "KONG Classic Rubber Dog Toy Medium",
    description: "Durable natural-rubber enrichment toy with an unpredictable bounce and a hollow centre for treats.",
    category: "toy",
    petType: "dog",
    price: 1099,
    stock: 30,
    images: [image("photo-1601758124510-52d02ddb7cbd")],
  },
  {
    productName: "Trixie Cat Feather Wand",
    description: "Interactive feather wand that encourages chasing, jumping, and supervised play for indoor cats.",
    category: "toy",
    petType: "cat",
    price: 349,
    stock: 46,
    images: [image("photo-1545249390-6bdfa286032f")],
  },
  {
    productName: "Living World Bird Swing",
    description: "Wooden hanging swing designed to provide exercise, balance practice, and enrichment for small pet birds.",
    category: "toy",
    petType: "bird",
    price: 399,
    stock: 25,
    images: [image("photo-1522926193341-e9ffd686c60f")],
  },
  {
    productName: "Trixie Silent Hamster Wheel 20cm",
    description: "Solid running wheel with a quiet mechanism and safe running surface for Syrian hamsters and small rodents.",
    category: "toy",
    petType: "hamster",
    price: 899,
    stock: 18,
    images: [image("photo-1452721226468-f95fb66ebf83")],
  },
  {
    productName: "Hertzko Self Cleaning Slicker Brush",
    description: "Fine bent-wire grooming brush with a push-button cleaning system for removing loose fur and light tangles.",
    category: "grooming",
    petType: "dog",
    price: 799,
    stock: 27,
    images: [image("photo-1516734212186-a967f81ad0d7")],
  },
  {
    productName: "Trixie Cat Nail Clipper",
    description: "Compact stainless-steel claw clipper with a comfortable grip for careful at-home cat grooming.",
    category: "grooming",
    petType: "cat",
    price: 299,
    stock: 38,
    images: [image("photo-1576201836106-db1758fd1c97")],
  },
  {
    productName: "Himalaya Erina EP Pet Shampoo 200ml",
    description: "Gentle cleansing shampoo for dogs and cats formulated to maintain coat hygiene and reduce unpleasant odour.",
    category: "grooming",
    petType: "other",
    price: 270,
    stock: 40,
    images: [image("photo-1556228578-8c89e6adf883")],
  },
  {
    productName: "Virbac Epiotic Ear Cleanser 100ml",
    description: "Routine ear-cleansing solution for dogs and cats; use according to label directions or veterinary advice.",
    category: "medicine",
    petType: "other",
    price: 545,
    stock: 26,
    images: [image("photo-1587854692152-cbe660dbde88")],
  },
  {
    productName: "Drontal Plus Deworming Tablets",
    description: "Broad-spectrum deworming tablets for dogs. Dosage should be selected according to body weight and veterinary advice.",
    category: "medicine",
    petType: "dog",
    price: 480,
    stock: 32,
    images: [image("photo-1584308666744-24d5c474f2ae")],
  },
  {
    productName: "Beaphar Malt Hairball Paste 100g",
    description: "Palatable malt paste formulated to help cats pass swallowed hair and support comfortable digestion.",
    category: "medicine",
    petType: "cat",
    price: 699,
    stock: 22,
    images: [image("photo-1584308666744-24d5c474f2ae")],
  },
  {
    productName: "HUFT Adjustable Padded Dog Collar",
    description: "Soft padded everyday collar with an adjustable nylon strap, secure buckle, and metal leash ring.",
    category: "accessory",
    petType: "dog",
    price: 649,
    stock: 50,
    images: [image("photo-1583512603806-077998240c7a")],
  },
  {
    productName: "Savic Aseo Cat Litter Tray",
    description: "High-backed litter tray with a lowered entrance and removable rim to help contain litter scatter.",
    category: "accessory",
    petType: "cat",
    price: 1399,
    stock: 16,
    images: [image("photo-1548767797-d8c844163c4c")],
  },
  {
    productName: "SOBO Internal Aquarium Filter WP-1200F",
    description: "Compact internal aquarium filter that combines mechanical filtration with steady water circulation.",
    category: "accessory",
    petType: "fish",
    price: 1250,
    stock: 14,
    images: [image("photo-1546026423-cc4642628d2b")],
  },
  {
    productName: "Savic Primo 40 Bird Cage",
    description: "Practical small-bird cage with perches, feeding bowls, pull-out cleaning tray, and secure access doors.",
    category: "accessory",
    petType: "bird",
    price: 4499,
    stock: 9,
    images: [image("photo-1535930749574-1399327ce78f")],
  },
  {
    productName: "Trixie Glass Rabbit Water Bottle 500ml",
    description: "Chew-resistant glass drinking bottle with a stainless-steel nozzle and clear water-level indicator.",
    category: "accessory",
    petType: "rabbit",
    price: 699,
    stock: 28,
    images: [image("photo-1535338454770-8be927b5a00b")],
  },
  {
    productName: "M-Pets Airline Approved Pet Carrier",
    description: "Ventilated hard-shell travel carrier with a secure front door and carry handle for cats and small dogs.",
    category: "accessory",
    petType: "other",
    price: 2299,
    stock: 15,
    images: [image("photo-1601758174114-e711c0cbaa69")],
  },
  {
    productName: "HUFT Dog Training Treat Pouch",
    description: "Hands-free reward pouch with a wide opening, drawstring closure, and waist clip for training sessions.",
    category: "other",
    petType: "dog",
    price: 599,
    stock: 21,
    images: [image("photo-1558788353-f76d92427f16")],
  },
];

const buildProducts = (sellerIds) =>
  productCatalog.map((product, index) => ({
    ...product,
    seller: sellerIds[index % sellerIds.length],
    status: product.stock > 0 ? "available" : "out_of_stock",
    averageRating: 0,
    totalReviews: 0,
  }));

const getTotalAmount = (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);

const buildOrderItem = (product, quantity = 1) => ({
  product: product._id,
  quantity,
  price: product.price,
});

const applyOrderStock = async (orders) => {
  const productMap = new Map();

  orders.forEach((order) => {
    if (order.status === "cancelled") return;

    order.items.forEach((item) => {
      const productId = item.product.toString();
      productMap.set(productId, (productMap.get(productId) || 0) + item.quantity);
    });
  });

  await Promise.all(
    [...productMap.entries()].map(async ([productId, soldQuantity]) => {
      const product = await Product.findById(productId);
      if (!product) return;

      product.stock = Math.max(product.stock - soldQuantity, 0);
      if (product.stock === 0) {
        product.status = product.category === "pet" ? "sold" : "out_of_stock";
      }

      await product.save();
    })
  );
};

const updateProductRatingStats = async (productIds) => {
  await Promise.all(
    productIds.map(async (productId) => {
      const reviews = await Review.find({ product: productId });
      const totalReviews = reviews.length;
      const averageRating = totalReviews
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        : 0;

      await Product.findByIdAndUpdate(productId, {
        averageRating: Number(averageRating.toFixed(1)),
        totalReviews,
      });
    })
  );
};

const seed = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing in backend/.env");
  }

  await mongoose.connect(process.env.MONGO_URI);

  const hashedPassword = await bcrypt.hash(password, 10);

  await Promise.all(
    users.map((user) =>
      User.updateOne(
        { email: user.email },
        {
          $set: {
            ...user,
            admin: Boolean(user.admin),
            password: hashedPassword,
            isActive: true,
          },
        },
        { upsert: true, runValidators: true }
      )
    )
  );

  const seededUsers = await User.find({
    email: { $in: users.map((user) => user.email) },
  });
  const sellerUsers = seededUsers.filter((user) => user.role === "seller");
  const customerUsers = seededUsers.filter((user) => user.role === "customer");
  const sellerIds = sellerUsers.map((seller) => seller._id);
  const products = buildProducts(sellerIds);

  // Product references exist in carts, wishlists, orders, and reviews, so reset
  // all commerce data before replacing the complete product catalog.
  await Promise.all([
    Cart.deleteMany({}),
    Wishlist.deleteMany({}),
    Order.deleteMany({}),
    Review.deleteMany({}),
    Product.deleteMany({}),
  ]);

  const insertedProducts = await Product.insertMany(products);
  const productByName = Object.fromEntries(
    insertedProducts.map((product) => [product.productName, product])
  );
  const customerByEmail = Object.fromEntries(
    customerUsers.map((user) => [user.email, user])
  );

  const carts = [
    {
      buyer: customerByEmail["ananya.customer@example.com"]._id,
      items: [
        buildOrderItem(productByName["Royal Canin Maxi Adult Dog Food 4kg"], 2),
        buildOrderItem(productByName["KONG Classic Rubber Dog Toy Medium"], 1),
      ],
    },
    {
      buyer: customerByEmail["rohan.customer@example.com"]._id,
      items: [
        buildOrderItem(productByName["Trixie Cat Feather Wand"], 2),
        buildOrderItem(productByName["Savic Aseo Cat Litter Tray"], 1),
      ],
    },
    {
      buyer: customerByEmail["meera.customer@example.com"]._id,
      items: [
        buildOrderItem(productByName["Vitapol Budgie Seed Mix 1.2kg"], 3),
        buildOrderItem(productByName["Savic Primo 40 Bird Cage"], 1),
      ],
    },
  ].map((cart) => ({
    ...cart,
    totalAmount: getTotalAmount(cart.items),
  }));

  const wishlists = [
    {
      buyer: customerByEmail["ananya.customer@example.com"]._id,
      items: [
        { product: productByName["Milo - Golden Retriever Puppy"]._id },
        { product: productByName["M-Pets Airline Approved Pet Carrier"]._id },
      ],
    },
    {
      buyer: customerByEmail["dev.customer@example.com"]._id,
      items: [
        { product: productByName["Bella - Labrador Retriever Puppy"]._id },
        { product: productByName["HUFT Dog Training Treat Pouch"]._id },
      ],
    },
    {
      buyer: customerByEmail["isha.customer@example.com"]._id,
      items: [
        { product: productByName["Luna - Persian Kitten"]._id },
        { product: productByName["Whiskas Tuna Kitten Food 1.1kg"]._id },
      ],
    },
  ];

  const orderDrafts = [
    {
      buyer: customerByEmail["ananya.customer@example.com"]._id,
      items: [
        buildOrderItem(productByName["Royal Canin Maxi Adult Dog Food 4kg"], 1),
        buildOrderItem(productByName["Hertzko Self Cleaning Slicker Brush"], 1),
      ],
      shippingAddress: {
        phone: "9543210987",
        address: "41 Jubilee Hills, Hyderabad",
      },
      paymentMethod: "cod",
      paymentStatus: "pending",
      paid: false,
      status: "pending",
    },
    {
      buyer: customerByEmail["rohan.customer@example.com"]._id,
      items: [
        buildOrderItem(productByName["Luna - Persian Kitten"], 1),
        buildOrderItem(productByName["Whiskas Tuna Kitten Food 1.1kg"], 2),
      ],
      shippingAddress: {
        phone: "9432109876",
        address: "7 Anna Salai, Chennai",
      },
      paymentMethod: "razorpay",
      paymentStatus: "paid",
      razorpayOrderId: "order_demo_rohan_001",
      razorpayPaymentId: "pay_demo_rohan_001",
      razorpaySignature: "demo_signature_rohan",
      paid: true,
      paidAt: new Date("2026-05-10T10:30:00.000Z"),
      status: "delivered",
    },
    {
      buyer: customerByEmail["meera.customer@example.com"]._id,
      items: [
        buildOrderItem(productByName["Rio and Sky - Budgerigar Pair"], 1),
        buildOrderItem(productByName["Savic Primo 40 Bird Cage"], 1),
      ],
      shippingAddress: {
        phone: "9321098765",
        address: "63 Civil Lines, Delhi",
      },
      paymentMethod: "cod",
      paymentStatus: "pending",
      paid: false,
      status: "confirmed",
    },
    {
      buyer: customerByEmail["dev.customer@example.com"]._id,
      items: [
        buildOrderItem(productByName["Bella - Labrador Retriever Puppy"], 1),
        buildOrderItem(productByName["HUFT Adjustable Padded Dog Collar"], 1),
      ],
      shippingAddress: {
        phone: "9210987654",
        address: "9 Ring Road, Ahmedabad",
      },
      paymentMethod: "razorpay",
      paymentStatus: "paid",
      razorpayOrderId: "order_demo_dev_001",
      razorpayPaymentId: "pay_demo_dev_001",
      razorpaySignature: "demo_signature_dev",
      paid: true,
      paidAt: new Date("2026-05-12T12:45:00.000Z"),
      status: "shipped",
    },
    {
      buyer: customerByEmail["isha.customer@example.com"]._id,
      items: [
        buildOrderItem(productByName["Trixie Cat Nail Clipper"], 1),
        buildOrderItem(productByName["Beaphar Malt Hairball Paste 100g"], 1),
      ],
      shippingAddress: {
        phone: "9109876543",
        address: "33 FC Road, Pune",
      },
      paymentMethod: "cod",
      paymentStatus: "pending",
      paid: false,
      status: "cancelled",
    },
    {
      buyer: customerByEmail["sara.customer@example.com"]._id,
      items: [
        buildOrderItem(productByName["TetraBits Complete Fish Food 93g"], 2),
        buildOrderItem(productByName["SOBO Internal Aquarium Filter WP-1200F"], 1),
      ],
      shippingAddress: {
        phone: "9876501234",
        address: "14 Panampilly Nagar, Kochi",
      },
      paymentMethod: "razorpay",
      paymentStatus: "paid",
      razorpayOrderId: "order_demo_sara_001",
      razorpayPaymentId: "pay_demo_sara_001",
      razorpaySignature: "demo_signature_sara",
      paid: true,
      paidAt: new Date("2026-05-14T09:15:00.000Z"),
      status: "delivered",
    },
  ].map((order) => ({
    ...order,
    totalAmount: getTotalAmount(order.items),
  }));

  const orders = await Order.insertMany(orderDrafts);
  await applyOrderStock(orders);
  await Cart.insertMany(carts);
  await Wishlist.insertMany(wishlists);

  const reviews = [
    {
      user: customerByEmail["rohan.customer@example.com"]._id,
      product: productByName["Luna - Persian Kitten"]._id,
      rating: 5,
      comment: "Beautiful kitten, healthy and already comfortable at home.",
    },
    {
      user: customerByEmail["rohan.customer@example.com"]._id,
      product: productByName["Whiskas Tuna Kitten Food 1.1kg"]._id,
      rating: 4,
      comment: "Good quality food and my kitten liked it immediately.",
    },
    {
      user: customerByEmail["sara.customer@example.com"]._id,
      product: productByName["TetraBits Complete Fish Food 93g"]._id,
      rating: 5,
      comment: "Fish are eating well and the pack is good value.",
    },
    {
      user: customerByEmail["sara.customer@example.com"]._id,
      product: productByName["SOBO Internal Aquarium Filter WP-1200F"]._id,
      rating: 4,
      comment: "Keeps the tank clear and was simple to install.",
    },
  ];

  await Review.insertMany(reviews);
  await updateProductRatingStats([...new Set(reviews.map((review) => review.product))]);

  console.log(
    `Seeded ${users.length} users, ${insertedProducts.length} products, ${carts.length} carts, ${wishlists.length} wishlists, ${orders.length} orders, and ${reviews.length} reviews.`
  );
  console.log(`Dummy user password: ${password}`);
  console.log("Admin login: admin@example.com");

  await mongoose.disconnect();
};

seed().catch(async (error) => {
  console.error("Seeding failed:", error);
  await mongoose.disconnect();
  process.exit(1);
});
