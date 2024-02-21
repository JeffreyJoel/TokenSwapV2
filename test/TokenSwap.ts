import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("TokenSwap", function () {
  async function deployTokenSwapFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const SwapTokenA = await ethers.getContractFactory("SwapTokenA");
    const swapTokenA = await SwapTokenA.deploy(owner);

    const SwapTokenB = await ethers.getContractFactory("SwapTokenB");
    const swapTokenB = await SwapTokenB.deploy(owner);

    const TokenSwap = await ethers.getContractFactory("TokenSwap");
    const tokenSwap = await TokenSwap.deploy(
      swapTokenA.target,
      swapTokenB.target
    );

    return { swapTokenA, swapTokenB, tokenSwap, owner, otherAccount };
  }

  describe("TokenSwap", function () {
    it("Should allow the user to swap", async function () {
      // const swapAmount = 100;
      const { swapTokenA, swapTokenB, tokenSwap, owner, otherAccount } =
        await loadFixture(deployTokenSwapFixture);
      await swapTokenA.connect(owner).approve(tokenSwap, 10000000000);
      await swapTokenB.connect(owner).approve(tokenSwap, 10000000000);

      await swapTokenA.transfer(tokenSwap.target, 10000000000);
      await swapTokenB.transfer(tokenSwap.target, 10000000000);

      const addressBalanceOfTokenA = await swapTokenA.balanceOf(tokenSwap);

      const addressBalanceOfTokenB = await swapTokenB.balanceOf(tokenSwap);

      expect(addressBalanceOfTokenA).to.equal(10000000000);
      expect(addressBalanceOfTokenB).to.equal(10000000000);

      const swap = await tokenSwap.swapAToB(100000);
      await swap.wait();
      console.log(swap);
      

      //  await
      // await swapTokenA.connect(otherAccount).approve(tokenSwap, 1000);

      // await tokenSwap.s
      // await staking.connect(owner).stake(stakeAmount);

      // expect(stakeAmount).to.not.equal(0);
      // expect(await staking.totalSupply()).to.equal(stakeAmount);
      // expect(await staking.balanceOf(owner.address)).to.equal(stakeAmount);
    });
  });
});
