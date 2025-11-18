/**
 * Predefined Brand Colors
 * 
 * Collection of well-known brand color palettes for quick reference.
 * 
 * @module lib/brand-analysis/predefinedBrands
 */

export interface BrandPalette {
	name: string
	colors: string[]
	description?: string
}

/**
 * Predefined brand color palettes
 */
export const predefinedBrands: BrandPalette[] = [
	{
		name: 'Coca-Cola',
		colors: ['#F40009', '#FFFFFF', '#000000'],
		description: 'Classic red and white',
	},
	{
		name: 'IKEA',
		colors: ['#FFCC00', '#003399', '#FFFFFF'],
		description: 'Blue and yellow',
	},
	{
		name: 'Spotify',
		colors: ['#1DB954', '#191414', '#FFFFFF'],
		description: 'Green and black',
	},
	{
		name: "McDonald's",
		colors: ['#FFC72C', '#DA020E', '#FFFFFF'],
		description: 'Golden arches',
	},
	{
		name: 'Nike',
		colors: ['#000000', '#FFFFFF', '#C4C4C4'],
		description: 'Black and white',
	},
	{
		name: 'Starbucks',
		colors: ['#00704A', '#FFFFFF', '#000000'],
		description: 'Green and white',
	},
	{
		name: 'Facebook',
		colors: ['#1877F2', '#FFFFFF', '#42A5F5'],
		description: 'Blue social',
	},
	{
		name: 'Twitter',
		colors: ['#1DA1F2', '#14171A', '#FFFFFF'],
		description: 'Blue bird',
	},
	{
		name: 'Instagram',
		colors: ['#E4405F', '#FCAF45', '#833AB4', '#5851DB', '#405DE6'],
		description: 'Gradient rainbow',
	},
	{
		name: 'YouTube',
		colors: ['#FF0000', '#000000', '#FFFFFF'],
		description: 'Red and black',
	},
	{
		name: 'Amazon',
		colors: ['#FF9900', '#000000', '#FFFFFF'],
		description: 'Orange smile',
	},
	{
		name: 'Google',
		colors: ['#4285F4', '#EA4335', '#FBBC05', '#34A853'],
		description: 'Primary colors',
	},
	{
		name: 'Microsoft',
		colors: ['#F25022', '#7FBA00', '#00A4EF', '#FFB900'],
		description: 'Four squares',
	},
	{
		name: 'Apple',
		colors: ['#000000', '#FFFFFF', '#A8A8A8'],
		description: 'Minimalist',
	},
	{
		name: 'Netflix',
		colors: ['#E50914', '#000000', '#FFFFFF'],
		description: 'Red and black',
	},
	{
		name: 'Airbnb',
		colors: ['#FF5A5F', '#00A699', '#FC642D', '#484848'],
		description: 'Rausch and babu',
	},
	{
		name: 'Uber',
		colors: ['#000000', '#FFFFFF', '#1FBAD6'],
		description: 'Black and cyan',
	},
	{
		name: 'LinkedIn',
		colors: ['#0077B5', '#000000', '#FFFFFF'],
		description: 'Professional blue',
	},
	{
		name: 'Pinterest',
		colors: ['#BD081C', '#FFFFFF', '#000000'],
		description: 'Red pin',
	},
	{
		name: 'Snapchat',
		colors: ['#FFFC00', '#FFFFFF', '#000000'],
		description: 'Yellow ghost',
	},
	{
		name: 'TikTok',
		colors: ['#000000', '#FFFFFF', '#FF0050', '#00F2EA'],
		description: 'Black and gradient',
	},
	{
		name: 'Adobe',
		colors: ['#FF0000', '#FF7F00', '#FFD700', '#00FF00', '#0000FF', '#4B0082'],
		description: 'Creative suite',
	},
	{
		name: 'PayPal',
		colors: ['#003087', '#009CDE', '#012169'],
		description: 'Blue payment',
	},
	{
		name: 'Visa',
		colors: ['#1A1F71', '#F7B600'],
		description: 'Blue and gold',
	},
	{
		name: 'Mastercard',
		colors: ['#EB001B', '#F79E1B'],
		description: 'Red and orange',
	},
	{
		name: 'FedEx',
		colors: ['#4D148C', '#FF6600', '#FFFFFF'],
		description: 'Purple and orange',
	},
	{
		name: 'UPS',
		colors: ['#7B2009', '#FFB500', '#FFFFFF'],
		description: 'Brown and gold',
	},
	{
		name: 'BMW',
		colors: ['#0066CC', '#FFFFFF', '#000000'],
		description: 'Blue and white',
	},
	{
		name: 'Mercedes-Benz',
		colors: ['#00ADEF', '#000000', '#FFFFFF'],
		description: 'Silver star',
	},
	{
		name: 'Toyota',
		colors: ['#EB0A1E', '#FFFFFF', '#000000'],
		description: 'Red oval',
	},
	{
		name: 'Volkswagen',
		colors: ['#001E50', '#FFFFFF', '#E6E6E6'],
		description: 'Blue VW',
	},
	{
		name: 'Samsung',
		colors: ['#1428A0', '#FFFFFF', '#000000'],
		description: 'Blue electronics',
	},
	{
		name: 'Sony',
		colors: ['#000000', '#FFFFFF', '#7C8285'],
		description: 'Black and white',
	},
	{
		name: 'LG',
		colors: ['#A50034', '#FFFFFF', '#000000'],
		description: 'Red and white',
	},
	{
		name: 'HP',
		colors: ['#0096D6', '#000000', '#FFFFFF'],
		description: 'Blue tech',
	},
	{
		name: 'Dell',
		colors: ['#007DB8', '#FFFFFF', '#000000'],
		description: 'Blue computer',
	},
	{
		name: 'Intel',
		colors: ['#0071C5', '#FFFFFF', '#000000'],
		description: 'Blue processor',
	},
	{
		name: 'NVIDIA',
		colors: ['#76B900', '#000000', '#FFFFFF'],
		description: 'Green GPU',
	},
	{
		name: 'AMD',
		colors: ['#ED1C24', '#000000', '#FFFFFF'],
		description: 'Red processor',
	},
	{
		name: 'Disney',
		colors: ['#113CCF', '#FFFFFF', '#000000'],
		description: 'Blue magic',
	},
	{
		name: 'Marvel',
		colors: ['#EC1D24', '#000000', '#FFFFFF'],
		description: 'Red comics',
	},
	{
		name: 'DC Comics',
		colors: ['#0078F0', '#000000', '#FFFFFF'],
		description: 'Blue comics',
	},
	{
		name: 'Pepsi',
		colors: ['#004B93', '#C41E3A', '#FFFFFF'],
		description: 'Blue and red',
	},
	{
		name: 'Red Bull',
		colors: ['#ED1C24', '#FDB913', '#FFFFFF'],
		description: 'Red and yellow',
	},
	{
		name: 'Heineken',
		colors: ['#008200', '#FF0000', '#FFFFFF'],
		description: 'Green and red',
	},
	{
		name: 'Budweiser',
		colors: ['#FF0000', '#FFFFFF', '#000000'],
		description: 'Red and white',
	},
	{
		name: 'Nestlé',
		colors: ['#000000', '#FFFFFF', '#E31837'],
		description: 'Black and red',
	},
	{
		name: 'Coca-Cola Zero',
		colors: ['#000000', '#FFFFFF', '#F40009'],
		description: 'Black zero',
	},
	{
		name: 'Ferrari',
		colors: ['#DC143C', '#000000', '#FFFFFF'],
		description: 'Racing red',
	},
	{
		name: 'Lamborghini',
		colors: ['#FFB800', '#000000', '#FFFFFF'],
		description: 'Yellow bull',
	},
	{
		name: 'Porsche',
		colors: ['#000000', '#FFFFFF', '#C41E3A'],
		description: 'Black and red',
	},
	{
		name: 'Audi',
		colors: ['#000000', '#FFFFFF', '#BB0A30'],
		description: 'Four rings',
	},
	{
		name: 'Ford',
		colors: ['#003478', '#FFFFFF', '#000000'],
		description: 'Blue oval',
	},
	{
		name: 'Chevrolet',
		colors: ['#FFC72C', '#1A1A1A', '#FFFFFF'],
		description: 'Gold bowtie',
	},
	{
		name: 'Tesla',
		colors: ['#E31937', '#000000', '#FFFFFF'],
		description: 'Red T',
	},
]

