import { auth } from "@clerk/nextjs/server";
import type { Product } from "@/types/product";
import { DashboardResponse } from "@/types/dashboard";
import { ProductsClient } from "./products-client";
import { SectionErrorBoundary } from "@/components/ui/error-boundary";

const StorePage = async () => {
  const { getToken } = await auth();
  const token = await getToken();

  try {
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

    if (!productsResponse.ok) {
      throw new Error(`Failed to fetch products: ${productsResponse.status}`);
    }

    if (!dashboardResponse.ok) {
      throw new Error(`Failed to fetch user data: ${dashboardResponse.status}`);
    }

    const products: Product[] = await productsResponse.json();
    const user: DashboardResponse = await dashboardResponse.json();

    return (
      <SectionErrorBoundary>
        <ProductsClient products={products} user={user} />
      </SectionErrorBoundary>
    );
  } catch (error) {
    console.error("Store page data fetch error:", error);
    throw error;
  }
};

export default StorePage;
