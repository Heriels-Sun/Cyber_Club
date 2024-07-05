use gstd::{
    prelude::*,
    collections::BTreeMap,
    ActorId
};

#[derive(Debug, Default)]
pub struct ContractSignlessAccounts {
    pub signless_accounts_address_by_user_address: BTreeMap<ActorId, ActorId>,
    pub signless_accounts_address_by_no_wallet_name: BTreeMap<String, ActorId>,
    pub signless_data_by_signless_address: BTreeMap<ActorId, SignlessAccount>
}

impl ContractSignlessAccounts {
    pub fn get_user_address(&self, caller: ActorId, user_address: Option<ActorId>) -> Result<ActorId, SignlessError> {
        let address = match user_address {
            Some(address) => {
                let signless_account_address = self
                    .signless_accounts_address_by_user_address
                    .get(&address)
                    .ok_or(SignlessError::SignlessAccountHasInvalidSession)?;

                if *signless_account_address != caller {
                    return Err(SignlessError::SignlessAccountNotApproved);
                }

                address
            },
            None => caller
        };

        Ok(address)
    }

    pub fn add_signless_data(&mut self, signless_address: ActorId, signless_data: SignlessAccount) {
        self.signless_data_by_signless_address
            .insert(signless_address, signless_data);
            
    }

    pub fn set_signless_account_to_user_address(
        &mut self, 
        signless_address: ActorId, 
        user_address: ActorId, 
        signless_data: SignlessAccount
    ) -> Result<(), SignlessError> {
        if self.signless_accounts_address_by_user_address.contains_key(&user_address) {
            return Err(SignlessError::UserAddressAlreadyExists);
        }

        if self.signless_data_by_signless_address.contains_key(&signless_address) {
            return Err(SignlessError::SignlessAddressAlreadyEsists);
        }

        self.add_signless_data(signless_address, signless_data);

        self.signless_accounts_address_by_user_address
            .insert(user_address, signless_address);

        Ok(())
    }

    pub fn set_signless_account_to_no_wallet_name(
        &mut self,
        signless_address: ActorId,
        no_wallet_account: String,
        signless_data: SignlessAccount
    ) -> Result<(), SignlessError> {
        if self.signless_accounts_address_by_no_wallet_name.contains_key(&no_wallet_account) {
            return Err(SignlessError::NoWalletAccountAlreadyExists);
        }

        if self.signless_data_by_signless_address.contains_key(&signless_address) {
            return Err(SignlessError::SignlessAddressAlreadyEsists);
        }

        self.add_signless_data(signless_address, signless_data);

        self.signless_accounts_address_by_no_wallet_name
            .insert(no_wallet_account, signless_address);

        Ok(())
    }

    pub fn check_signless_address_by_user_address(
        &self,
        signless_address: ActorId,
        user_address: ActorId,
    ) -> Result<(), SignlessError> {
        let sigmless_addres_from_user_address = self.signless_accounts_address_by_user_address
            .get(&user_address);

        let Some(actual_signless_address) = sigmless_addres_from_user_address else {
            return Err(SignlessError::UserDoesNotHasSignlessAccount);
        };

        if signless_address != *actual_signless_address {
            return Err(SignlessError::SessionHasInvalidSignlessAccount);
        }

        Ok(())
    }

    pub fn check_signless_address_by_no_wallet_account(
        &self,
        signless_address: ActorId,
        no_wallet_account: String
    ) -> Result<(), SignlessError> {
        let signless_address_by_no_wallet_account = self.signless_accounts_address_by_no_wallet_name
            .get(&no_wallet_account);

        let Some(actual_signless_address) = signless_address_by_no_wallet_account else {
            return Err(SignlessError::UserDoesNotHasSignlessAccount);
        };

        if signless_address != *actual_signless_address {
            return Err(SignlessError::SessionHasInvalidSignlessAccount);
        }

        Ok(())
    }

    
}

#[derive(Encode, Decode, TypeInfo, Clone, Debug)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum SignlessError {
    SignlessAccountHasInvalidSession,
    SignlessAccountNotApproved,
    SignlessAddressAlreadyEsists,
    UserAddressAlreadyExists,
    UserDoesNotHasSignlessAccount,
    NoWalletAccountAlreadyExists,
    NoWalletAccountDoesNotHasSignlessAccount,
    SessionHasInvalidSignlessAccount
}

#[derive(Encode, Decode, TypeInfo, Clone, Debug, Default)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct SignlessAccount {
    address: String,
    encoded: String,
    encoding: SignlessEncodingData,
    meta: SignlessMetaData
}

#[derive(Encode, Decode, TypeInfo, Clone, Debug, Default)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct SignlessEncodingData {
    content: (String, String),
    encoding_type: (String, String),
    version: String
}

#[derive(Encode, Decode, TypeInfo, Clone, Debug, Default)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct SignlessMetaData {
    name: String
}
