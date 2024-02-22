import React, { useEffect, useState } from "react";
import "./style.css";
import { DollarSign, ShieldX, ShoppingCart, Tags } from "lucide-react";

export const Stats = ({ tableData = [] }) => {
  const [aggregatedData, setAggregatedData] = useState({
    totalProducts: 0,
    totalStoreValue: 0,
    outOfStockCount: 0,
    categories: [],
    uniqueCategoriesCount: 0,
  });

  useEffect(() => {
    console.log(tableData);
    const result = tableData.reduce(
      (acc, product) => {
        // Exclude products that are not enabled
        if (!product.isEnabled) {
          return acc;
        }

        // Total products aggregation of all quantities
        acc.totalProducts += product.quantity;

        // Total store value aggregation of values
        acc.totalStoreValue += parseFloat(product.value.replace("$", ""));

        // Out of stocks count
        if (product.quantity === 0) {
          acc.outOfStockCount++;
        }

        // Total categories count
        if (!acc.categories.includes(product.category)) {
          acc.categories.push(product.category);
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

  const renderIcon = (key: string) => {
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
  const renderText = (key: string) => {
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
      {Object.keys(aggregatedData).map((each) => {
        if (each !== "categories") {
          //   return;
          return (
            <div key={each} className="eachInfo">
              <div>{renderIcon(each)}</div>
              <div className="textInfo">
                <div className="statName">{renderText(each)}</div>
                <div className="statValue">{aggregatedData?.[each] || 0}</div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
  return <div>{JSON.stringify(aggregatedData)}</div>;
};
