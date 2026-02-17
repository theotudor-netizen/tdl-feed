export default async function handler(req, res) {
  const SOURCE =
    "https://docs.google.com/spreadsheets/d/1rloYVdK1DCxqHm5iBrz0t5xAB0OSgYlhAdsXjAEcVqQ/gviz/tq?tqx=out:csv&gid=1598351056";

  const response = await fetch(SOURCE, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Accept: "text/csv,*/*",
    },
  });

  if (!response.ok) {
    return res.status(502).send(`Upstream error: ${response.status}`);
  }

  let csv = await response.text();

  const lines = csv.replace(/\r\n/g, "\n").split("\n");
  if (lines.length > 0) {
    lines[0] = "barcode,salePrice,quantity,listPrice";
  }

  csv = lines.join("\n");

  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  return res.status(200).send(csv);
}
