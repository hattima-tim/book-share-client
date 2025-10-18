"use client";

import { ShoppingCart } from "lucide-react";
import { PurchaseDialog } from "./purchaseDialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Product } from "@/types/product";
import { DashboardResponse } from "@/types/dashboard";

const PurchaseButton = ({
  product,
  user,
}: {
  product: Product;
  user: DashboardResponse;
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <Button onClick={() => setSelectedProduct(product)}>
        <ShoppingCart className="mr-2 h-4 w-4" />
        Purchase
      </Button>

      {selectedProduct && (
        <PurchaseDialog
          product={selectedProduct}
          user={user}
          open={!!selectedProduct}
          onOpenChange={(open) => !open && setSelectedProduct(null)}
        />
      )}
    </>
  );
};

export default PurchaseButton;
