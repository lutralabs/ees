#!/bin/bash
# endorse a user with 1 ether
cast send --private-key <0xaaa...> <EES contract address> "endorse(address,string,string,string)" 0xde9326aA0e86BF7b646aB46895bE50e27D7802de "Researcher" "One of the best I know." "fc:dev.pseudobun.eth" --value 1ether
# get the donation reward of a user in eth
cast call <EES contract address> "getBalance(address)" 0xde9326aA0e86BF7b646aB46895bE50e27D7802de | cast to-dec | cast from-wei