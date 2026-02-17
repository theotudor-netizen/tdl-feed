export default async function handler(req, res) {
  const SOURCE = "https://docs.google.com/spreadsheets/d/1rloYVdK1DCxqHm5iBrz0t5xAB0OSgYlhAdsXjAEcVqQ/gviz/tq?tqx=out:csv&gid=1598351056";

  const response = await fetch(SOURCE, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Accept": "text/csv,*/*"
    }
  });

  if (!response.ok) {
    return res.status(502).send(`Upstream error: ${response.status}`);
  }

  const csv = await response.text();

  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");

  return res.status(200).send(csv);
}
