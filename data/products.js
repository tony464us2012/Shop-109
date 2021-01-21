const products = [
  {
    name: 'America',
    image: '/images/burger.png',
    description:
    'Certified 100% Angus Beef (Americanized) with American cheese, house ketchup, organic heritage mix lettuce, tomato, and red onion. Served on sesame bun.',
    category: 'Burger',
    price: 11.00,
  },
  {
    name: 'Wake Up',
    image: '/images/burger.png',
    description:
     'Certified 100% Angus beef, aged Cheddar cheese, applewood smoked bacon, hash brown patty, charred balsamic onions, baby pink sauce, and a fried egg to top it off. Served on a sesame bun.',
    category: 'Burger',
    price: 14.00,
  },
  {
    name: 'Nica',
    image: '/images/burger.png',
    description:
      'Certified 100% Angus beef, authentic Nicaraguan fried cheese, mild jalapeño cream sauce, fried sweet plantains patty, and Nicaraguan coleslaw. Served on a Brioche bun.',
    category: 'Burger',
    price: 14.00,
  },
  {
    name: 'Mac Addict',
    image: '/images/burger.png',
    description:
      'Certified 100% Angus beef, four cheese homemade macaroni cheese (Cheddar, Mozzarella, American and Monterrey Jack) and applewood smoked bacon bits on a pretzel bun.',
    category: 'Burger',
    price: 14.00,
  },
  {
    name: 'Double O',
    image: '/images/burger.png',
    description:
      'Certified 100% Angus beef, jalapeño Cheddar Jack cheese, truffle aioli sauce, house ketchup, fresh caramelized strawberries, and bacon. Served between glazed doughnuts from Mojo Donuts.',
    category: 'Burger',
    price: 14.00
  },
  {
    name: 'Blue Moon',
    image: '/images/burger.png',
    description:
      'Certified 100% Angus beef aged with Blue Moon beer, Buttermilk Blue cheese, sautéed onions and mushrooms, orange mayo, organic heritage mix lettuce, tomato, and pickles. Served on a sesame bun.',
    category: 'Burger',
    price: 14.00,
  },
  {
    name: 'Panther',
    image: '/images/burger.png',
    description:
      'Half certified 100% Angus beef and half ground Italian pancetta with aged Cheddar cheese, Applewood smoked bacon, homemade bbq sauce, organic heritage mix lettuce, tomato, red onion, and a pickle spear. Served on Parmesan crusted sourdough bread.',
    category: 'Burger',
    price: 13.00,
  },
  {
    name: 'Colombian Voyage',
    image: '/images/burger.png',
    description:
      'Certified 100% Angus beef mix with chorizo on a bed of chips with a traditional AREPA DE CHOCLO, melted Mozzarella cheese, crunchy chicharones, cilantro sauce, and topped off with a fried egg. Served on a brioche bun.',
    category: 'Burger',
    price: 15.00,
  },
  {
    name: 'Say Hello to My Little Burger',
    image: '/images/burger.png',
    description:
      'Certified 100% Angus beef with Swiss cheese, ham croquetas, sliced roasted pork, and Dijon mayo. Served on a bed of fried sweet plantain between perfectly toasted Cuban bread.',
    category: 'Burger',
    price: 15.00,
  },
  {
    name: 'BBQ Blues',
    image: '/images/burger.png',
    description:
      'Certified 100% Angus beef mix made spicy with seven spices, Havarti cheese, applewood smoked bacon, onion jam, and homemade blue berry corn bread covered with our unique blue cheese bbq sauce. Served on a sesame bun.',
    category: 'Burger',
    price: 13.00,
  },
  {
    name: 'Mex 109',
    image: '/images/burger.png',
    description:
      'Certified 100% Angus beef, homemade guacamole, fresh pico de gallo, sliced jalapeño and jalapeño cheddar jack cheese. Served on a brioche bun.',
    category: 'Burger',
    price: 13.00,
  },
  {
    name: 'Fry Sampler Small',
    image: '/images/appetizer.png',
    description: 
      'A perfect chance to sample our fries, the small includes three types of fries and the large includes five types of fries.',
    category: 'Appetizer',
    price: 8.00
  },
  {
    name: 'Duck Wings',
    image: '/images/appetizer.png',
    description: 
      'Six perfectly deep fried duck wings served with your choice of spicy buffalo, house bbq, honey ginger, Asian chili, or Blue cheese bbq.',
    category: 'Appetizer',
    price: 10.00
  },
  {
    name: 'Mini Mac Balls',
    image: '/images/appetizer.png',
    description: 
      'Three deep fried balls stuffed with our delicious homemade four cheese mac and cheese balls.',
    category: 'Appetizer',
    price: 9.00
  },
  {
    name: 'Chicken Wings 8 Piece',
    image: '/images/appetizer.png',
    description: 
      'Double cooked specialty chicken wings served with your choice of spicy buffalo, house bbq, honey ginger, Asian chili, or blue cheese bbq.',
    category: 'Appetizer',
    price: 9.00
  },
  {
    name: 'Pizza Dip',
    image: '/images/appetizer.png',
    description: 
      'Incredibly cheesy and yummy pepperoni pizza dip served with pita bread.',
    category: 'Appetizer',
    price: 9.00
  },
  {
    name: 'Caesar Salad',
    image: '/images/salad.jfif',
    description: 
      'Organic heritage mix lettuce, parmesan cheese, and homemade croutons. All tossed in classic caesar dressing.',
    category: 'Salad',
    price: 10.00
  },
  {
    name: 'Bacon Salad',
    image: '/images/salad.jfif',
    description: 
      'Organic heritage mix lettuce tossed with; chopped up crispy bacon, Mexican blend cheese, cherry tomatoes, and pickled onions.',
    category: 'Salad',
    price: 12.00
  },
  {
    name: 'Hollywood Bowl',
    image: '/images/salad.jfif',
    description: 
      'Organic heritage mix lettuce, fresh avocado, hardboiled egg, Applewood smoked bacon, bleu cheese crumbles, and cherry tomatoes.',
    category: 'Salad',
    price: 12.00
  },
  {
    name: 'Burger in a Bowl',
    image: '/images/salad.jfif',
    description: 
      'Your favorite burger served bun less on a bed of organic heritage mix lettuce, cherry tomatoes, and red onions.',
    category: 'Salad',
    price: 11.00
  },
  {
    name: 'Homemade Mac & Cheese',
    image: '/images/forkandknife.jpg',
    description: 
      'The perfect combination of creamy and cheesy four cheese mac and cheese.',
    category: 'ForkandKnife',
    price: 10.00
  },
  {
    name: 'Loaded Quesadilla',
    image: '/images/forkandknife.jpg',
    description: 
      'A huge flour tortilla filled with cheese, chicken, and bacon. Tossed on the grill to perfectly melt the cheese and toast the tortilla. We then load the quesadilla with chips, melted cheese, pink sauce, cilantro sauce, and more bacon!',
    category: 'ForkandKnife',
    price: 14.00
  },
  {
    name: 'Big Boy Tenders',
    image: '/images/forkandknife.jpg',
    description: 
      'A big mountain of fresh fries loaded with Mexican blend cheese and a bunch of bacon. Served with your choice of our specialty fried chicken or fish.',
    category: 'ForkandKnife',
    price: 14.00
  },
  {
    name: 'Chicken Fit Club',
    image: '/images/sandwich.png',
    description: 
      'Grilled chicken breast with crisp Applewood smoked bacon, sliced avocado, crumbled Blue cheese, Dijon mustard-mayo, romaine lettuce, and tomato. Served on a toasted honey wheat bun.',
    category: 'Sandwich',
    price: 12.00
  },
  {
    name: 'Spicy Crisp Sandwich',
    image: '/images/sandwich.png',
    description: 
      'A tender crisp fried chicken breast on a bed of lettuce and tomatoes, with grated Parmesan cheese, sriracha, fresh jalapeño peppers, and an onion ring. Served between our parmesan crusted sourdough bread (Caution: Very Spicy).',
    category: 'Sandwich',
    price: 12.00
  },
  {
    name: 'Chicken and Waffle Sandwich',
    image: '/images/sandwich.png',
    description: 
      'Perfectly fried chicken breast served on a bed of sweet potato fries with sriracha maple sauce, bacon, and topped with a fried egg. Served between Viv’s perfect Belgian waffles.',
    category: 'Sandwich',
    price: 14.00
  },
  {
    name: 'Fries',
    image: '/images/side.jfif',
    description:
      'Topped with Sea Salt and a side of our homemade ketchup. Ask for them loaded up with cheese and Applewood smoked bacon bits.',
    category: 'Side',
    price: 4.00
  },
  {
    name: 'Tots',
    image: '/images/side.jfif',
    description:
      'Tots topped with Sea Salt and a side of chef prepared pink sauce. Ask for them loaded up cheese and Applewood smoked bacon.',
    category: 'Side',
    price: 4.00
  },
  {
    name: 'Truffle Fries',
    image: '/images/side.jfif',
    description:
      'Hand cut fries with parmesan and truffle oil, served with Truffle Aioli sauce.',
    category: 'Side',
    price: 5.00
  },
  {
    name: 'Onion Rings',
    image: '/images/side.jfif',
    description:
      'Beer battered and served with Chipotle Mayo.',
    category: 'Side',
    price: 5.00
  },
  {
    name: 'Sweet Potato Fries',
    image: '/images/side.jfif',
    description:
      'Perfectly crispy string style sweet potato fires served with maple cream sauce. Ask for them loaded up with caramel and cinnamon.',
    category: 'Side',
    price: 4.00
  },
  {
    name: 'Sweet Potato Tots',
    image: '/images/side.jfif',
    description:
      'An innovative twist on classic tater tots, these are tater tots made with sweet potato. Served with our delicious maple cream sauce. Ask for them loaded up with caramel and cinnamon.',
    category: 'Side',
    price: 5.00
  },
  {
    name: 'Nica Cheese Bites',
    image: '/images/side.jfif',
    description:
      'Fried Nicaraguan cheese cut in the shape of fries and served with our homemade guava sauce.',
    category: 'Side',
    price: 6.00
  },
  {
    name: 'Oinkin Sliders',
    image: '/images/burger.png',
    description: 
        'Homemade pulled pork bathed in our specialty BBQ Sauce served with a side of Coleslaw.',
    category: 'Slider',
    price: 10.00
  }
]

export default products
