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

  // Проверяем наличие ключа
  const token = process.env.DADATA_API_KEY;
  console.log(token);

  if (!token) {
    console.error("ОШИБКА: Переменная DADATA_API_KEY не найдена в .env.local");
    return NextResponse.json(
      { error: "DADATA_API_KEY не задан на сервере" },
      { status: 500 },
    );
  }

  try {
    const res = await fetch(
      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          lat: Number(lat),
          lon: Number(lon),
          count: 1,
          radius_meters: 100,
        }),
      },
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Ошибка от DaData API:", res.status, errorText);
      return NextResponse.json(
        { error: "Ошибка запроса к DaData", details: errorText },
        { status: 500 },
      );
    }

    const data = await res.json();
    const suggestion = data?.suggestions?.[0];

    if (!suggestion) {
      return NextResponse.json({ address: null }, { status: 200 });
    }

    return NextResponse.json({ address: suggestion });
  } catch (error) {
    console.error("Сетевая ошибка при запросе к DaData:", error);
    return NextResponse.json(
      { error: "Не удалось соединиться с DaData" },
      { status: 500 },
    );
  }
}
