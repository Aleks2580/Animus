import React, { useEffect } from "react";
import { supabase } from "../supabaseClient";

const TestSupabase = () => {
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("Products").select("*");

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        console.log("Fetched data:", data);
      }
    };

    fetchProducts();
  }, []);

  return <div>Check the console for Supabase data!</div>;
};

export default TestSupabase;
