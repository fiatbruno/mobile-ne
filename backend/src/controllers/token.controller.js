import { Token } from "../models/token.model.js";
import {
  createSuccessResponse,
  errorResponse,
  serverErrorResponse,
} from "../utils/api.response.js";

export const generateToken = async (req, res) => {
  try {
    const { amount, meterNumber } = req.body;

    // Validate amount and meter number
    if (!isValidAmount(amount)) {
      return errorResponse(
        "Invalid amount. Amount must be a multiple of 100.",
        res
      );
    }

    if (!isValidMeterNumber(meterNumber)) {
      return errorResponse(
        "Invalid meter number. Meter number must be 6 digits.",
        res
      );
    }

    // Calculate token value in days
    const tokenValueDays = calculateTokenValueDays(amount);

    // Generate an eight-digit token
    const token = generateEightDigitToken();

    // Save the token in the database
    const newToken = new Token({
      meterNumber,
      token,
      tokenValueDays,
      tokenStatus: "NEW",
      amount,
      purchasedDate: new Date(),
    });

    await newToken.save();

    return createSuccessResponse(
      "Token generated successfully.",
      { token },
      res
    );
  } catch (ex) {
    return serverErrorResponse(ex, res);
  }
};

export const validateToken = async (req, res) => {
  try {
    const { token } = req.body;

    // Find the token in the database
    const foundToken = await Token.findOne({ token });

    if (!foundToken) {
      return errorResponse("Invalid token.", res);
    }

    // Check the token status
    if (foundToken.tokenStatus !== "NEW") {
      return errorResponse("Token has already been used or expired.", res);
    }

    // Update the token status to "USED"
    foundToken.tokenStatus = "USED";
    await foundToken.save();

    return createSuccessResponse(
      "Token validated successfully.",
      { daysOfLighting: foundToken.tokenValueDays },
      res
    );
  } catch (ex) {
    return serverErrorResponse(ex, res);
  }
};

export const getTokensByMeterNumber = async (req, res) => {
  try {
    const { meterNumber } = req.body;

    // Validate meter number
    if (!isValidMeterNumber(meterNumber)) {
      return errorResponse(
        "Invalid meter number. Meter number must be 6 digits.",
        res
      );
    }

    // Find all tokens for the given meter number
    const tokens = await Token.find({ meterNumber });

    if (tokens.length === 0) {
      return createSuccessResponse(
        "No tokens found for the given meter number.",
        [],
        res
      );
    }

    return createSuccessResponse("Tokens retrieved successfully.", tokens, res);
  } catch (ex) {
    return serverErrorResponse(ex, res);
  }
};


// Validate amount (must be a multiple of 100)
const isValidAmount = (amount) => {
  return amount % 100 === 0 && amount >= 100 && amount <= 5 * 365 * 100;
};

// Validate meter number (must be 6 digits)
const isValidMeterNumber = (meterNumber) => {
  return /^\d{6}$/.test(meterNumber);
};

// Calculate token value in days based on the amount
const calculateTokenValueDays = (amount) => {
  return amount / 100;
};

// Generate an eight-digit token
const generateEightDigitToken = () => {
  let token = "";
  for (let i = 0; i < 8; i++) {
    token += Math.floor(Math.random() * 10);
  }
  return token;
};

// export const getAllTokensAsAnAdmin = async (req, res) => {
//   try {
//     let tokens = await Token.find();

//     var returnTokensArray = [];

//     for (const token of tokens) {
//       let tokenObject = {
//         token: {},
//         votes: 0,
//       };
//       tokenObject.votes = await getVotesOfAToken(token._id);
//       tokenObject.token = token;
//       returnTokensArray.push(tokenObject);
//     }

//     return successResponse("Tokens", returnTokensArray, res);
//   } catch (ex) {
//     return serverErrorResponse(ex, res);
//   }
// };

// const getTokensOfAUser = async (candidateId) => {
//   let votes = await VoteCandidate.find({
//     candidate: candidateId,
//   }).countDocuments();
//   return votes;
// };

// export const getAllCandidatesAsAVoter = async (req, res) => {
//   try {
//     let { _id } = req.user;

//     let candidates = await Candidate.find();

//     let checkIfUserVoted = await VoteCandidate.findOne({ voter: _id });

//     let returnCandidatesArray = [];

//     for (const candidate of candidates) {
//       let candidateObject = {
//         candidate: {},
//         votes: null,
//       };
//       checkIfUserVoted &&
//         (candidateObject.votes = await getVotesOfACandidate(candidate._id));
//       candidateObject.candidate = candidate;
//       returnCandidatesArray.push(candidateObject);
//     }

//     return successResponse("Candidates", returnCandidatesArray, res);
//   } catch (ex) {
//     return serverErrorResponse(ex, res);
//   }
// };

// export const registerCandidate = async (req, res) => {
//   try {
//     let checkNationalId = await User.findOne({
//       nationalId: req.body.nationalId,
//     });
//     if (checkNationalId)
//       return errorResponse("National ID is already registered!", res);

//     let candidate = new Candidate(
//       _.pick(req.body, [
//         "firstname",
//         "lastname",
//         "nationalId",
//         "profilePicture",
//         "gender",
//         "missionStatement",
//       ])
//     );

//     try {
//       await candidate.save();
//       return createSuccessResponse(
//         "Candidate registered successfully",
//         candidate,
//         res
//       );
//     } catch (ex) {
//       return errorResponse(ex.message, res);
//     }
//   } catch (ex) {
//     return serverErrorResponse(ex, res);
//   }
// };

// export const voteACandidate = async (req, res) => {
//   try {
//     const { _id } = req.user;
//     const { candidateId } = req.body;

//     let checkIfUserVoted = await VoteCandidate.findOne({ voter: _id });
//     if (checkIfUserVoted) return errorResponse("User has already voted!", res);

//     let findCandidate = await Candidate.findById(candidateId);
//     if (!findCandidate)
//       return notFoundResponse("id", candidateId, "Candidate", res);

//     let newVote = new VoteCandidate({
//       voter: _id,
//       candidate: candidateId,
//     });

//     await newVote.save();

//     return successResponse("You voted the candidate successfully", {}, res);
//   } catch (ex) {
//     return serverErrorResponse(ex, res);
//   }
// };
