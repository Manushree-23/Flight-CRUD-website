class FlightController {
  create = async (request, response) => {
    const form = { ...request.body };
    console.log('Received form data:', form);  // Log the received data

    let rbody = {};
    let rstatus = 200;

    try {
      // Ensure data exists before saving
      if (!form.airline || !form.source || !form.destination || !form.fare || !form.duration) {
        throw new Error("Missing required fields");
      }

      const flightModel = new FlightModel({
        airline: form.airline,
        source: form.source,
        destination: form.destination,
        fare: form.fare,
        duration: form.duration
      });

      const flightModelRes = await flightModel.save();
      const flightDoc = await FlightModel.findById(flightModelRes._id).lean();

      rbody = {
        data: flightDoc,
        isError: false
      };

      console.log("Flight created:", rbody);
    } catch (error) {
      rbody = {
        data: { message: `Error in creating flight: ${error.message}` },
        isError: true
      };
      console.error("create error", error);
      rstatus = 500;
    }

    response.status(rstatus).send(rbody);
  };

  update = async (request, response) => {
    const id = request.params.id;
    const form = { ...request.body };
    let rbody = {};
    let rstatus = 200;

    try {
      const updatableFlight = {
        airline: form.airline,
        source: form.source,
        destination: form.destination,
        fare: form.fare,
        duration: form.duration
      };

      const updatedFlight = await FlightModel.findOneAndUpdate(
        { _id: id },
        updatableFlight,
        { new: true }
      );

      if (!updatedFlight) {
        rbody = {
          data: { message: "Flight not found" },
          isError: true
        };
        rstatus = 404;
      } else {
        rbody = {
          data: updatedFlight,
          isError: false
        };
      }
    } catch (error) {
      rbody = {
        data: { message: `Error in updating flight: ${error.message}` },
        isError: true
      };
      console.log(rbody);
      rstatus = 500;
    }

    response.status(rstatus).send(rbody);
  };

  remove = async (request, response) => {
    const id = request.params.id;
    let rbody = {};
    let rstatus = 200;

    try {
      const flightModelRes = await FlightModel.findOneAndDelete({ _id: id });

      if (!flightModelRes) {
        rbody = {
          data: { message: "Flight not found" },
          isError: true
        };
        rstatus = 404;
      } else {
        rbody = {
          data: { message: "Flight deleted successfully" },
          isError: false
        };
      }
    } catch (error) {
      rbody = {
        data: { message: `Error in deleting flight: ${error.message}` },
        isError: true
      };
      console.log(rbody);
      rstatus = 500;
    }

    response.status(rstatus).send(rbody);
  };

  readAll = async (request, response) => {
    let rbody = {};
    let rstatus = 200;

    try {
      const flightDocs = await FlightModel.find().lean();

      rbody = {
        data: flightDocs,
        isError: false
      };
      console.log(rbody);
    } catch (error) {
      rbody = {
        data: { message: `Error in fetching flights: ${error.message}` },
        isError: true
      };
      console.log(rbody);
      rstatus = 500;
    }

    response.status(rstatus).send(rbody);
  };

  readById = async (request, response) => {
    const id = request.params.id;
    let rbody = {};
    let rstatus = 200;

    try {
      const flightDoc = await FlightModel.findOne({ _id: id }).lean();

      if (!flightDoc) {
        rbody = {
          data: { message: "Flight not found" },
          isError: true
        };
        rstatus = 404;
      } else {
        rbody = {
          data: flightDoc,
          isError: false
        };
      }
    } catch (error) {
      rbody = {
        data: { message: `Error in fetching flight: ${error.message}` },
        isError: true
      };
      console.log(rbody);
      rstatus = 500;
    }

    response.status(rstatus).send(rbody);
  };
}

module.exports = FlightController;
