module.exports = {
  verifyOtp: async (req, res, next) => {
    try {
      const otp = req.body.otp;
      const User = await user.findOne({ otp: otp });

      if (User) {
        await user.updateOne({ otp: otp }, { vStatus: true });

        res.status(200).send({ msg: "User verified successfully" });
      } else {
        res.status(422).send({ msg: "Something went wrong, user not found" });
      }
    } catch (err) {
      next(err);
    }
  },
};
