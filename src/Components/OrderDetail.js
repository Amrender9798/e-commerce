import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

export default function OrderDetail(props) {
  const { products, amount, status, createdAt } = props.order;
  console.log(products);
  const getStatusIcon = () => {
    switch (status) {
      case "Pending":
        return <HourglassEmptyIcon color="action" />;
      case "Delivered":
        return <CheckCircleIcon color="success" />;
      case "Shipped":
        return <LocalShippingIcon color="primary" />;
      default:
        return null;
    }
  };

  function formatDateString(originalDate) {
    const dateObject = new Date(originalDate);
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObject.getFullYear();

    return `${day}-${month}-${year}`;
  }

  return (
    <div className="bg-white p-4 rounded shadow myorder-order-card">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold myorder-order-heading">
          Ordered On: {formatDateString(createdAt)}
        </h1>
        <div className="flex items-center">
          {getStatusIcon()}
          <span className="ml-2">{status}</span>
        </div>
      </div>
      <table className="w-full border-collapse myorder-table">
        <thead>
          <tr>
            <th className="bg-gray-200 text-left p-2 myorder-th">S.no</th>
            <th className="bg-gray-200 text-left p-2 myorder-th">
              Product Name
            </th>
            <th className="bg-gray-200 text-left p-2 myorder-th">Price</th>
            <th className="bg-gray-200 text-left p-2 myorder-th">Quantity</th>
            <th className="bg-gray-200 text-left p-2 myorder-th">
              Total Price
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => (
            <tr key={i}>
              <td className="border p-2 myorder-td">{i + 1}</td>
              <td className="border p-2 myorder-td">{product.productName}</td>
              <td className="border p-2 myorder-td">{product.price}</td>
              <td className="border p-2 myorder-td">x{product.quantity}</td>
              <td className="border p-2 myorder-td">₹{product.price}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-200 font-semibold myorder-grand-total-row h-10">
            <td colSpan={4} className="p-2">
              Grand Total
            </td>
            <td className="p-2">₹{amount}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
