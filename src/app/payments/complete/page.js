export default async function Page({ searchParams }) {
  const secretKey = "test_sk_jZ61JOxRQVEgBEdMnag8W0X9bAqw";
  const basicToken = Buffer.from(`${secretKey}:`, `utf-8`).toString("base64");

  const url = `https://api.tosspayments.com/v1/payments/orders/${searchParams.orderId}`;
  const payments = await fetch(url, {
    headers: {
      Authorization: `Basic ${basicToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  const { card } = payments;
  return (
    <div>
      <h1>결제가 완료되었습니다</h1>
      <ul>
        <li>
        </li>
      </ul>
    </div>
  );
}
