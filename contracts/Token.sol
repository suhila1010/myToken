// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";

contract token{
    using SafeMath for uint;
    string public name = "Arabic token";
    string public symbol = "ARAB";
    uint256 public decimal = 10;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;

    constructor(){
        totalSupply = 2000 * (10 ** decimal);
        balanceOf[msg.sender] = totalSupply;

    }

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    function transfer(address _to, uint256 _value) public returns(bool sucsess){
        require(_to != address(0));
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] = balanceOf[msg.sender].sub(_value);
        balanceOf[_to] = balanceOf[_to].add(_value);
        emit Transfer(msg.sender, _to, _value);
        return true;
    }


}