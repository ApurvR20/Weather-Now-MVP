export async function fetchWeatherData(city) {
  // --- Step 1: Geocode the city name ---
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`
  );
  const geoData = await geoRes.json();

  if (!geoData.results?.length) throw new Error("City not found.");

  const geo = geoData.results[0];
  console.log("Geo data:", geo); // <-- check what the API actually returns

  const {
    latitude,
    longitude,
    name,
    timezone,
    country,
    country_code,
    admin1,   // region/state
    admin2,   // secondary region if present
  } = geo;

  // --- Step 2: Build the display name for country/region ---
  let countryDisplay = "Unknown";

  if (country) {
    countryDisplay = country;
  } else if (country_code) {
    countryDisplay = country_code;
  } else if (admin1 && admin2) {
    countryDisplay = `${admin1}, ${admin2}`;
  } else if (admin1) {
    countryDisplay = admin1;
  }

  // --- Step 3: Current weather ---
  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=precipitation_probability&timezone=${timezone}`
  );
  const weatherData = await weatherRes.json();

  // --- Step 4: Flood data (optional) ---
  let floodDischarge = null;
  try {
    const floodRes = await fetch(
      `https://flood-api.open-meteo.com/v1/flood?latitude=${latitude}&longitude=${longitude}&daily=river_discharge&timezone=${timezone}`
    );
    const floodData = await floodRes.json();
    floodDischarge = floodData?.daily?.river_discharge?.[0] ?? null;
  } catch {
    console.warn("Flood API unavailable");
  }

  const current = weatherData?.current_weather;
  const precipitation =
    weatherData?.hourly?.precipitation_probability?.[0] ?? null;

  const time = current?.time
    ? new Date(current.time).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  // --- Step 5: Return unified data object ---
  return {
    city: name,
    country: countryDisplay,
    temperature: current?.temperature ?? "N/A",
    windspeed: current?.windspeed ?? "N/A",
    weathercode: current?.weathercode ?? 0,
    precipitation,
    time,
    floodDischarge,
  };
}
