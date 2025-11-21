export class ProductResponseDto {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId?: string;
  imageUrl?: string;
}
