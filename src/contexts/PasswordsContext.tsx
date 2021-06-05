import { createContext, useContext, useMemo, useState } from "react";

import getUserItems, { IItem } from "~/services/getUserItems";
import updateItemRequest from "~/services/updateItem";
import itemHasOldPassword from "~/utils/itemHasOldPassword";
import itemHasReusedPassword from "~/utils/itemHasReusedPassword";
import itemHasWeakPassword from "~/utils/itemHasWeakPassword";

interface IPasswords {
  isLoading: boolean;
  errorMessage: string;
  items: IItem[];
  itemsWithWeakPassword: IItem[];
  itemWithReusedPassword: IItem[];
  itemWithOldPassword: IItem[];
  getItems: () => void;
  updateItem: (item: IItem) => void;
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
  const [fetchedItems, setFetchedItems] = useState<Array<IItem>>([]);

  const getItems = async () => {
    setIsLoading(true);

    try {
      const userItems = await getUserItems();

      setFetchedItems(userItems);
    } catch (error) {
      setErrorMessage(error.message);
    }

    setIsLoading(false);
  };

  const updateItem = async (item: IItem) => {
    setIsLoading(true);

    try {
      const updatedItem = await updateItemRequest(item);
      setFetchedItems((items: IItem[]) => [
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
