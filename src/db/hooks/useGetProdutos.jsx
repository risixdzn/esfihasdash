import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

const useGetProdutos = (user) => {
  const [showProdutos, setShowProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProdutosFromFirebase = async () => {
      setIsLoading(true);
      const produtosCollection = collection(db, "users", user.uid, "produtos");
      const produtosSnapshot = await getDocs(produtosCollection);
      const produtosList = produtosSnapshot.docs.map((doc) => ({
        ...doc.data(),
        key: doc.id,
      }));
      setShowProdutos(produtosList);
      setIsLoading(false);
    };

    getProdutosFromFirebase();
  }, [user.uid]);

  return {showProdutos, isLoading};
};

export default useGetProdutos;
