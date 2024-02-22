import { useEffect, useState } from "react";
import "./style.css";
import { DollarSign, ShieldX, ShoppingCart, Tags } from "lucide-react";
import { StockInterface } from "../../interface";

interface AggregatedData {
  totalProducts: number;
  totalStoreValue: number;
  outOfStockCount: number;
  categories: string[];
  uniqueCategoriesCount: number;
}

export const Stats = ({ tableData = [] }: { tableData: StockInterface[] }) => {
  const [aggregatedData, setAggregatedData] = useState<AggregatedData>({
    totalProducts: 0,
    totalStoreValue: 0,
    outOfStockCount: 0,
    categories: [],
    uniqueCategoriesCount: 0,
  });

  useEffect(() => {
    // console.log(tableData);
    const result = tableData.reduce<AggregatedData>(
      (acc, product: StockInterface) => {
        // Exclude products that are not enabled
        if (!product.isEnabled) {
          return acc;
        }

        // Total products aggregation of all quantities
        acc.totalProducts += parseInt(product.quantity);

        // Total store value aggregation of values
        acc.totalStoreValue += parseFloat(product.value.replace("$", ""));

        // Out of stocks count
        if (parseInt(product.quantity) === 0) {
          acc.outOfStockCount++;
        }

        // Total categories count
        if (!acc.categories.includes(product.category as string)) {
          acc.categories.push(product.category as string);
        }
        acc.uniqueCategoriesCount = acc.categories.length;

        return acc;
      },
      {
        totalProducts: 0,
        totalStoreValue: 0,
        outOfStockCount: 0,
        categories: [],
        uniqueCategoriesCount: 0,
      }
    );
    setAggregatedData(result);
  }, [tableData]);

  const renderIcon = (key: keyof AggregatedData) => {
    switch (key) {
      case "totalProducts":
        return <ShoppingCart size={30} />;
      case "totalStoreValue":
        return <DollarSign size={30} />;
      case "outOfStockCount":
        return <ShieldX size={30} />;
      case "uniqueCategoriesCount":
        return <Tags size={30} />;
    }
  };
  const renderText = (key: keyof AggregatedData) => {
    switch (key) {
      case "totalProducts":
        return "Total products";
      case "totalStoreValue":
        return "Total store value";
      case "outOfStockCount":
        return "Out of Stock";
      case "uniqueCategoriesCount":
        return "No. of Category";
    }
  };

  return (
    <div className="info">
      {Object.entries(aggregatedData).map(([each, value]) => {
        if (each !== "categories") {
          return (
            <div key={each} className="eachInfo">
              <div>{renderIcon(each as keyof AggregatedData)}</div>
              <div className="textInfo">
                <div className="statName">
                  {renderText(each as keyof AggregatedData)}
                </div>
                <div className="statValue">{value || 0}</div>
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
  return <div>{JSON.stringify(aggregatedData)}</div>;
};
