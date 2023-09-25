import { Space, Table, Typography, Input } from "antd";
import { useEffect, useState } from "react";
import { getOrders } from "./Api";

function Orders() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setDataSource(res.products);
      setLoading(false);
    });
  }, []);

  // Filter the data based on the search text
  const filteredDataSource = dataSource.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Orders</Typography.Title>
      <Input.Search
        placeholder="Search orders"
        onChange={e => setSearchText(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Table
        loading={loading}
        columns={[
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Price",
            dataIndex: "price",
            render: (value) => <span>${value}</span>,
          },
          {
            title: "DiscountedPrice",
            dataIndex: "discountedPrice",
            render: (value) => <span>${value}</span>,
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
          },
          {
            title: "Total",
            dataIndex: "total",
          },
        ]}
        dataSource={filteredDataSource} // Use the filtered data
        pagination={{
          pageSize: 5,
        }}
      />
    </Space>
  );
}

export default Orders;
