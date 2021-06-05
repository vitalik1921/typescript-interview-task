import { createContext, useContext, useMemo, useState } from "react";

import { getPasswords, IPassword } from "~/services/passwords";
import { updatePassword } from "~/services/passwords";
import itemHasOldPassword from "~/utils/itemHasOldPassword";
import itemHasReusedPassword from "~/utils/itemHasReusedPassword";
import itemHasWeakPassword from "~/utils/itemHasWeakPassword";

interface IPasswords {
  isLoading: boolean;
  errorMessage: string;
  items: IPassword[];
  itemsWithWeakPassword: IPassword[];
  itemWithReusedPassword: IPassword[];
  itemWithOldPassword: IPassword[];
  getItems: () => void;
  updateItem: (item: IPassword) => void;
}

const PasswordsContext = createContext<IPasswords>({
  isLoading: true,
  errorMessage: null,
  items: [],
  itemsWithWeakPassword: [],
  itemWithReusedPassword: [],
  itemWithOldPassword: [],
  getItems: () => {
    return;
  },
  updateItem: () => {
    return;
  },
});

export const usePasswordsContext = () => useContext(PasswordsContext);

export const PasswordsContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [fetchedItems, setFetchedItems] = useState<Array<IPassword>>([]);

  const getItems = async () => {
    setIsLoading(true);

    try {
      const userItems = await getPasswords();

      setFetchedItems(userItems);
    } catch (error) {
      setErrorMessage(error.message);
    }

    setIsLoading(false);
  };

  const updateItem = async (item: IPassword) => {
    setIsLoading(true);

    try {
      const updatedItem = await updatePassword(item);
      setFetchedItems((items: IPassword[]) => [
        ...items.filter((item) => item.id !== updatedItem.id),
        updatedItem,
      ]);
    } catch {
      setErrorMessage("Cannot update the item");
    } finally {
      setIsLoading(false);
    }
  };

  const itemsWithWeakPassword = useMemo(
    () => fetchedItems.filter(itemHasWeakPassword),
    [fetchedItems]
  );

  const itemWithReusedPassword = useMemo(
    () =>
      fetchedItems.filter((item) => itemHasReusedPassword(item, fetchedItems)),
    [fetchedItems]
  );

  const itemWithOldPassword = useMemo(
    () => fetchedItems.filter(itemHasOldPassword),
    [fetchedItems]
  );

  const items = useMemo(
    () =>
      fetchedItems.filter(
        (fetchedItem) =>
          itemsWithWeakPassword.find((item) => item.id === fetchedItem.id) ||
          itemWithReusedPassword.find((item) => item.id === fetchedItem.id) ||
          itemWithOldPassword.find((item) => item.id === fetchedItem.id)
      ),
    [itemsWithWeakPassword, itemWithReusedPassword, itemWithOldPassword]
  );

  const value = {
    isLoading,
    errorMessage,
    items,
    itemsWithWeakPassword,
    itemWithReusedPassword,
    itemWithOldPassword,
    getItems,
    updateItem,
  };

  return (
    <PasswordsContext.Provider value={value}>
      {children}
    </PasswordsContext.Provider>
  );
};

export default PasswordsContext;
