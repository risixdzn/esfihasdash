import { useState, useEffect } from "react";
import { collection } from "firebase/firestore";
import { getCountFromServer } from "firebase/firestore";//import your function for getting count
import { db } from "../firebase-config";

import Skeleton from "../components/Dashboard/pages/components/Skeleton/skeleton";

function PedidosCount({ user }) {
  const [pedidos, setPedidos] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchPedidos() {
      const pedidosRef = collection(db, "users", user.uid, "pedidos");
      const snapshot = await getCountFromServer(pedidosRef);
      setPedidos(snapshot.data().count - 1);
      setLoading(false);
    }
    fetchPedidos();
  }, [user.uid]);

  return (
    (loading? <Skeleton width="15px" height="20px"/> : <span>{pedidos}</span>)
  )
}

export default PedidosCount;