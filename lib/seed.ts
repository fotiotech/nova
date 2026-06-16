import mongoose from 'mongoose';
import Product from './models/Product';
import User from './models/User';
import Connection from './models/Connection';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI!;

const CATEGORIES = [
  'electronique', 'mode', 'maison', 'beaute',
  'alimentation', 'sport', 'artisanat'
];

const PRODUCTS = [
  { name: 'Enceinte Bluetooth Portable', price: 8500, category: 'electronique', image: 'https://picsum.photos/seed/speaker-nv/400/400.jpg', description: 'Enceinte portable avec basses profondes et 12h d\'autonomie.', stock: 25, featured: true },
  { name: 'Dashiki Tissu Wax', price: 12000, category: 'mode', image: 'https://picsum.photos/seed/dashiki-nv/400/400.jpg', description: 'Magnifique dashiki avec motifs traditionnels camerounais.', stock: 15, featured: true },
  { name: 'Montre Connectée Pro', price: 25000, category: 'electronique', image: 'https://picsum.photos/seed/montre-nv/400/400.jpg', description: 'Suivi fitness, moniteur cardiaque et notifications.', stock: 10, featured: true },
  { name: 'Beurre de Karité Pur', price: 5500, category: 'beaute', image: 'https://picsum.photos/seed/karite-nv/400/400.jpg', description: 'Beurre de karité 100% naturel du Nord Cameroun.', stock: 40, featured: true },
  { name: 'Paniers Tissés (Lot de 3)', price: 7500, category: 'maison', image: 'https://picsum.photos/seed/paniers-nv/400/400.jpg', description: 'Paniers tissés à la main, région du Nord-Ouest. Lot de 3.', stock: 20, featured: true },
  { name: 'Café Arabica du Bamenda', price: 4500, category: 'alimentation', image: 'https://picsum.photos/seed/cafe-nv/400/400.jpg', description: 'Grains Arabica premium, hauts plateaux de Bamenda. 500g.', stock: 50, featured: true },
  { name: 'Chaussures de Running', price: 18000, category: 'sport', image: 'https://picsum.photos/seed/running-nv/400/400.jpg', description: 'Légères et respirantes avec amorti supérieur.', stock: 12, featured: false },
  { name: 'Toghu Traditionnel', price: 8500, category: 'mode', image: 'https://picsum.photos/seed/toghu-nv/400/400.jpg', description: 'Élégant tissu traditionnel camerounais.', stock: 8, featured: false },
  { name: 'Trépied Téléphone Bluetooth', price: 3500, category: 'electronique', image: 'https://picsum.photos/seed/tripod-nv/400/400.jpg', description: 'Trépied ajustable avec télécommande Bluetooth.', stock: 30, featured: false },
  { name: 'Cacao Pur du Cameroun', price: 3200, category: 'alimentation', image: 'https://picsum.photos/seed/cacao-nv/400/400.jpg', description: 'Poudre de cacao 100% camerounaise.', stock: 45, featured: false },
  { name: 'Vase Céramique Artisanal', price: 9500, category: 'artisanat', image: 'https://picsum.photos/seed/vase-nv/400/400.jpg', description: 'Vase en céramique fait main, motifs traditionnels.', stock: 6, featured: false },
  { name: 'Huile Essentielle Naturelle', price: 2800, category: 'beaute', image: 'https://picsum.photos/seed/huile-nv/400/400.jpg', description: 'Mélange d\'huiles naturelles pour cheveux. 150ml.', stock: 35, featured: false },
  { name: 'Sculpture Bois Ébène', price: 15000, category: 'artisanat', image: 'https://picsum.photos/seed/sculpt-nv/400/400.jpg', description: 'Sculpture traditionnelle en bois d\'ébène de Foumban.', stock: 4, featured: true },
  { name: 'Cacao en Pâte Artisanal', price: 5000, category: 'alimentation', image: 'https://picsum.photos/seed/pate-cacao-nv/400/400.jpg', description: 'Pâte de cacao artisanale pour boissons chaudes. 250g.', stock: 20, featured: false },
];

const DELIVERY_ZONES = [
  { region: 'Littoral', cities: [{ name: 'Douala', fee: 1500, enabled: true }, { name: 'Bonabéri', fee: 2000, enabled: true }, { name: 'Tiko', fee: 2500, enabled: true }] },
  { region: 'Centre', cities: [{ name: 'Yaoundé', fee: 1500, enabled: true }, { name: 'Mbalmayo', fee: 2500, enabled: true }, { name: 'Obala', fee: 2500, enabled: true }] },
  { region: 'Ouest', cities: [{ name: 'Bafoussam', fee: 3000, enabled: true }, { name: 'Dschang', fee: 3500, enabled: true }, { name: 'Foumban', fee: 3500, enabled: true }] },
  { region: 'Nord-Ouest', cities: [{ name: 'Bamenda', fee: 3500, enabled: true }, { name: 'Buea', fee: 2500, enabled: true }, { name: 'Limbe', fee: 3000, enabled: true }] },
  { region: 'Sud-Ouest', cities: [{ name: 'Kumba', fee: 3000, enabled: true }] },
  { region: 'Sud', cities: [{ name: 'Ebolowa', fee: 3500, enabled: true }, { name: 'Sangmélima', fee: 4000, enabled: true }] },
  { region: 'Est', cities: [{ name: 'Bertoua', fee: 4000, enabled: true }, { name: 'Batouri', fee: 4500, enabled: true }] },
  { region: 'Adamaoua', cities: [{ name: 'Ngaoundéré', fee: 4000, enabled: true }, { name: 'Meiganga', fee: 4500, enabled: true }] },
  { region: 'Nord', cities: [{ name: 'Garoua', fee: 4500, enabled: true }, { name: 'Guider', fee: 5000, enabled: true }] },
  { region: 'Extrême-Nord', cities: [{ name: 'Maroua', fee: 5000, enabled: true }, { name: 'Kousseri', fee: 5500, enabled: true }, { name: 'Mora', fee: 6000, enabled: true }] },
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('🔄 Connecté à MongoDB Atlas');

  // Créer l'admin par défaut
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@novaorizon.cm';
  const adminPass = process.env.ADMIN_PASSWORD || 'NovaOrizon2025!';
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPass, 12);
    await User.create({
      name: 'Admin NovaOrizon',
      email: adminEmail,
      phone: '+237 600 000 000',
      password: hashedPassword,
      role: 'admin',
    });
    console.log('✅ Admin créé :', adminEmail);
  } else {
    console.log('ℹ️ Admin existe déjà');
  }

  // Produits
  const existingProducts = await Product.countDocuments();
  if (existingProducts === 0) {
    await Product.insertMany(PRODUCTS);
    console.log('✅ ' + PRODUCTS.length + ' produits ajoutés');
  } else {
    console.log('ℹ️ Produits déjà présents (' + existingProducts + ')');
  }

  // Connexions par défaut
  const connections = [
    { key: 'campay', data: { connected: false, baseUrl: 'https://campay.net/api', username: '', password: '' } },
    { key: 'mongodb', data: { connected: true, uri: MONGODB_URI, database: 'novaorizon' } },
    { key: 'email', data: { connected: false, host: '', port: '587', user: '', pass: '' } },
    { key: 'sms', data: { connected: false, provider: 'campay', apiKey: '', from: 'NovaOrizon' } },
    { key: 'delivery', data: { zones: DELIVERY_ZONES } },
  ];

  for (const conn of connections) {
    const existing = await Connection.findOne({ key: conn.key });
    if (!existing) {
      await Connection.create(conn);
      console.log('✅ Connexion "' + conn.key + '" configurée');
    }
  }

  console.log('\n🎉 Seed terminé !');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('❌ Erreur seed:', err);
  process.exit(1);
});
