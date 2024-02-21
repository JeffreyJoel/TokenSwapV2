// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenSwap {
    IERC20 tokenA;
    IERC20 tokenB;
    uint256 public exchangeRate;

    event Swapped(address _swapper, uint256 _amountReceived, uint256 _amountRemitted);

    constructor(address _tokenA, address _tokenB) {
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
        exchangeRate = 100;
    }


    function swapAToB(uint256 _amount) external {
        require(tokenA.balanceOf(msg.sender) >= _amount, "Not enough A tokens");
     
        tokenA.transferFrom(msg.sender, address(this), _amount);
        tokenB.transfer(msg.sender, _amount * exchangeRate);

        emit Swapped(msg.sender, _amount, _amount * exchangeRate);
    }

    function swapBToA(uint256 _amount) external {
        require(tokenB.balanceOf(msg.sender) >= _amount, "Not enough B tokens");

        tokenB.transferFrom(msg.sender, address(this), _amount);
        tokenA.transfer(msg.sender, _amount / exchangeRate);

        emit Swapped(msg.sender, _amount, _amount / exchangeRate);

    }
}
