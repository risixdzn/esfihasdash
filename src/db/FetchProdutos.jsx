import { useState, useEffect } from "react";
import { collection } from "firebase/firestore";
import { getCountFromServer } from "firebase/firestore";
import { db } from "../firebase-config";

function ProdutosCount({ user }) {
  const [produtos, setProdutos] = useState(0);

  useEffect(() => {
    async function fetchProdutos() {
      const produtosRef = collection(db, "users", user.uid, "produtos");
      const snapshot = await getCountFromServer(produtosRef);
      setProdutos(snapshot.data().count - 1);
    }
    fetchProdutos();
  }, [user.uid]);

  return <span>{produtos}</span>;
}

export default ProdutosCount;
