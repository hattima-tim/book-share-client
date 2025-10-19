import { auth } from "@clerk/nextjs/server";
import type { Product } from "@/types/product";
import { DashboardResponse } from "@/types/dashboard";
import { ProductsClient } from "./products-client";

const StorePage = async () => {
  const { getToken } = await auth();
  const token = await getToken();

  const [productsResponse, dashboardResponse] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`, {
      method: "GET",
      cache: "force-cache",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dashboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }),
  ]);

  const products: Product[] = await productsResponse.json();
  const user: DashboardResponse = await dashboardResponse.json();

  return <ProductsClient products={products} user={user} />;
};

export default StorePage;
