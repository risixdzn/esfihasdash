import { useState, useEffect } from "react";
import { collection } from "firebase/firestore";
import { getCountFromServer } from "firebase/firestore";//import your function for getting count
import { db } from "../firebase-config";

function PedidosCount({ user }) {
  const [pedidos, setPedidos] = useState(0);

  useEffect(() => {
    async function fetchPedidos() {
      const pedidosRef = collection(db, "users", user.uid, "pedidos");
      const snapshot = await getCountFromServer(pedidosRef);
      setPedidos(snapshot.data().count - 1);
    }
    fetchPedidos();
  }, [user.uid]);

  return <span>{pedidos}</span>;
}

export default PedidosCount;