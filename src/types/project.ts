export interface Project {
  id: string;
  title: string;
  location: string;
  category: string;
  image: string;
  description?: string;
  price?: number | null;
  area?: string;
  bedrooms?: number | null;
  status?: string;
  rera?: string;
  gallery?: string[];
  isIllustrative?: boolean;
}
export const categories = ['Residential', 'Commercial', 'Luxury Plots', 'Industrial'];
export function formatPrice(price?: number | null) {
  return price == null ? 'Price on request' : new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
}
