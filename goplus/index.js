import { GoPlus, ErrorCode } from 'goplus-sdk-js';
const app_key = 'mBOMg20QW11BbtyH4Zh0';
const app_secret = 'V6aRfxlPJwN3ViJSIFSCdxPvneajuJsh';
const timeout = 30; // default timeout is 30s
GoPlus.config(app_key, app_secret, 30);

//create function to get chains supported by GoPlus
export async function supportedChains(apiName) {
    let supportedChains = await GoPlus.supportedChains(apiName);
    if (supportedChains.code != ErrorCode.SUCCESS) {
        return supportedChains.message;
    } else {
        return supportedChains.result;
    }
}


// create function to return address security
export async function addressSecurity(chain, address) {
    let addressRet = await GoPlus.addressSecurity(chain, address);
    if (addressRet.code != ErrorCode.SUCCESS) {
        return addressRet.message;
    } else {
        return addressRet.result;
    }
}

export async function approvalSecurity(chain, address) {
    let approvalRet = await GoPlus.approvalSecurity(chain, address)
    if (approvalRet.code != ErrorCode.SUCCESS && approvalRet.code != ErrorCode.DATA_PENDING_SYNC) {
        return approvalRet.message;
    } else {
        return approvalRet.result;
    }
}

//create function to get token security
export async function tokenSecurity(chain, addresses) {
    let tokenRet = await GoPlus.tokenSecurity(chain, addresses);
    if (tokenRet.code != ErrorCode.SUCCESS && tokenRet.code != ErrorCode.DATA_PENDING_SYNC) {
        return tokenRet.message;
    } else {
        return tokenRet.result;
    }
}

//create function to get dapp security
export async function dappSecurity(dapp) {
    let dappRet = await GoPlus.dappSecurity(dapp);
    if (dappRet.code != ErrorCode.SUCCESS) {
        return dappRet.message;
    } else {
        return dappRet.result;
    }
}




async function test() {


    let accessTokenRet = await GoPlus.getAccessToken();
    if (accessTokenRet.code != 1) {
        console.error(accessTokenRet.message);
    } else {
        console.log(accessTokenRet.result);
    }

    // supported chains
    let supportedChains = await GoPlus.supportedChains(GoPlus.API_NAMES.address_security);
    if (supportedChains.code != ErrorCode.SUCCESS) {
        console.error(supportedChains.message);
    } else {
        console.log(supportedChains.result);
    }

    // token security
    // let tokenRet = await GoPlus.tokenSecurity('137', ['0xc2a45fe7d40bcac8369371b08419ddafd3131b4a', '0xc2132d05d31c914a87c6611c10748aeb04b58e8f']);
    // if (tokenRet.code != ErrorCode.SUCCESS) {
    //     console.error(tokenRet.message);
    // } else {
    //     console.log({ res: tokenRet.result });
    // }

    // let tokenRet2 = await GoPlus.tokenSecurity('137', ['0xc2132d05d31c914a87c6611c10748aeb04b58e8f']);
    // if (tokenRet2.code != ErrorCode.SUCCESS) {
    //     console.error(tokenRet2.message);
    // } else {
    //     console.log({ res: tokenRet2.result });
    // }

    // address security
    let addressRet = await GoPlus.addressSecurity('137', '0xc2a45fe7d40bcac8369371b08419ddafd3131b4a');
    if (addressRet.code != ErrorCode.SUCCESS) {
        console.error(addressRet.message);
    } else {
        console.log(addressRet.result);
    }

    // // approval security
    // let approvalRet = await GoPlus.approvalSecurity('137', '0xc2a45fe7d40bcac8369371b08419ddafd3131b4a')
    // if (approvalRet.code != ErrorCode.SUCCESS && approvalRet.code != ErrorCode.DATA_PENDING_SYNC) {
    //     console.error(approvalRet.message);
    // } else {
    //     console.log(approvalRet.result);
    // }

    // // erc20 approval security
    // let erc20ApprovalRet = await GoPlus.erc20ApprovalSecurity('56', '0xc2a45fe7d40bcac8369371b08419ddafd3131b4a');
    // if (erc20ApprovalRet.code != ErrorCode.SUCCESS) {
    //     console.error(erc20ApprovalRet.message);
    // } else {
    //     console.log(erc20ApprovalRet.result);
    // }

    // // erc721 approval security
    // let erc721ApprovalRet = await GoPlus.erc721ApprovalSecurity('1', '0xd95dbdab08a9fed2d71ac9c3028aac40905d8cf3');
    // if (erc721ApprovalRet.code != ErrorCode.SUCCESS) {
    //     console.error(erc721ApprovalRet.message);
    // } else {
    //     console.log(erc721ApprovalRet.result);
    // }

    // // erc1155 approval security
    // let erc1155ApprovalRet = await GoPlus.erc1155ApprovalSecurity('56', '0xb0dccbb9c4a65a94a41a0165aaea79c8b2fc54ce');
    // if (erc1155ApprovalRet.code != ErrorCode.SUCCESS) {
    //     console.error(erc1155ApprovalRet.message);
    // } else {
    //     console.log(erc1155ApprovalRet.result);
    // }

    // // input decode
    // let decodeRet = await GoPlus.inputDecode('1', '0x4cc8aa0c6ffbe18534584da9b592aa438733ee66', '0xa0712d680000000000000000000000000000000000000000000000000000000062fee481');
    // if (decodeRet.code != ErrorCode.SUCCESS) {
    //     console.error(decodeRet.message);
    // } else {
    //     console.log(decodeRet.result);
    // }

    // // nft security
    // let nftRet = await GoPlus.nftSecurity('1', '0x11450058d796b02eb53e65374be59cff65d3fe7f');
    // if (nftRet.code != ErrorCode.SUCCESS && nftRet.code != ErrorCode.DATA_PENDING_SYNC) {
    //     console.error(nftRet.message);
    // } else {
    //     console.log(nftRet.result);
    // }

    // // dapp security
    // let dappRet = await GoPlus.dappSecurity('https://for.tube');
    // if (dappRet.code != ErrorCode.SUCCESS) {
    //     console.error(dappRet.message);
    // } else {
    //     console.log(dappRet.result);
    // }

    // // // phishing site
    // let phishingRet = await GoPlus.phishingSite('https://xn--cm-68s.cc/');
    // if (phishingRet.code != ErrorCode.SUCCESS) {
    //     console.error(phishingRet.message);
    // } else {
    //     console.log(phishingRet.result);
    // }
    process.exit(0);
}

export default test;


