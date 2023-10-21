const Spot = require("../schemas/spotSchema");

const ptvKey = process.env.PTV_KEY;

exports.valid = async ({ set, body }) => {
  return await fetch(
    `https://api.myptv.com/geocoding-osm/v1/places/by-position/${body.lat}/${body.lng}?detailLevel=CITY`,
    {
      method: "GET",
      headers: {
        apiKey: ptvKey,
      },
    }
  )
    .then((res) => {
      if (!res.ok) throw res;
      return res.json();
    })
    .then((result) => {
      console.log(result);
      if (result.places.length == 0) {
        // length will be 0 when not in a country -> to far in the sea
        return { status: "succes", data: false };
      }
      const splitted = result.places[0].formattedAddress.split(",");
      const validLocation = splitted.length > 2 ? false : true;
      set.status = 200;
      return { status: "succes", data: validLocation };
    })
    .catch((err) => {
      console.log(err);
      set.status = 500;
      return {
        status: "failed",
        message: "Internal error",
      };
    });
};

exports.createSpot = async ({ set, body }) => {
  try {
    const userId = set.headers.user_id;
    const spotObj = {
      name: body.name,
      location: {
        type: "Point",
        coordinates: [body.lng, body.lat],
      },
      user: userId,
    };

    const spot = await Spot.create(spotObj);

    set.status = 201;
    return {
      status: "succes",
      result: spot,
    };
  } catch (err) {
    set.status = 500;
    return {
      status: "failed",
      message: "Could not create the new spot",
    };
  }
};

exports.getAllSpots = async ({ set }) => {
  try {
    const userId = set.headers["user_id"];
    const spots = await Spot.find({ user: userId }, { name: 1, location: 1 });
    set.status = 200;
    return {
      status: "succes",
      detail: spots,
    };
  } catch (err) {
    console.log(err);
    set.status = 404;
    return {
      status: "failed",
      message: "Could not find spots",
    };
  }
};
