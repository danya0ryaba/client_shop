import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "lat и lon обязательны" },
      { status: 400 },
    );
  }

  const token = process.env.DADATA_API_KEY;

  if (!token) {
    return NextResponse.json(
      { error: "DADATA_API_KEY не задан" },
      { status: 500 },
    );
  }

  const res = await fetch(
    "https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        lat: Number(lat),
        lon: Number(lon),
        count: 1,
      }),
    },
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Ошибка запроса к DaData" },
      { status: 500 },
    );
  }

  const data = await res.json();

  const suggestion = data?.suggestions?.[0];

  if (!suggestion) {
    return NextResponse.json({ address: null }, { status: 200 });
  }

  return NextResponse.json({
    address: suggestion,
  });
}
