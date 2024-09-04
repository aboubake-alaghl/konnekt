import { createContext, useEffect, useMemo, useState } from "react";

interface ItemInterface {
    item: {
        price: number;
        name: string;
        id: number;
        image: string;
    },
    count: number;
}

interface CartProvierContextType {
    items: ItemInterface[];
    count: number;
    total: number;
    addItem: (product: ItemInterface['item'], count: number) => void;
    removeItem: (id: number) => void;
    getItem: (productId: number) => ItemInterface | undefined;
    hasItem: (productId: number) => boolean;
    clear: () => void;
};

const initialState: { items: ItemInterface[], count: number, total: number } = {
    items: [],
    count: 0,
    total: 0
};

const CartContext = createContext<CartProvierContextType>({
    ...initialState,
    addItem: () => { },
    removeItem: () => { },
    getItem: () => undefined,
    hasItem: () => false,
    clear: () => { },
});

const storageKey = "konnect_vpn_cart";

const CartProvider = ({ children }: {
    children: JSX.Element | JSX.Element[]
}) => {
    const [items, setItems] = useState<ItemInterface[]>([]);

    useEffect(() => {
        const json = localStorage.getItem(storageKey);
        if (json) { setItems(JSON.parse(json)); }
    }, []);

    const count = useMemo(
        () => items.reduce((acc, item) => acc + item.count, 0),
        [items]
    );

    const total = useMemo(
        () =>
            items.reduce(
                (acc, item) => acc + item.item.price * item.count,
                0
            ),
        [items]
    );

    const updateItemsStorage = (items: ItemInterface[]) => {
        localStorage.setItem(storageKey, JSON.stringify(items));
    };

    const getItem = (productId: number) => {
        return items.find((_item) => _item.item.id === productId);
    };

    const hasItem = (productId: number) => {
        return !!getItem(productId);
    };

    const addItem = (product: ItemInterface['item'], count: number) => {
        if (count < 1)
            return
        setItems((items) => {
            let next: ItemInterface[];
            if (hasItem(product.id)) {
                next = items.map((item) =>
                    item.item.id === product.id ? { item: product, count } : item
                );
            } else {
                next = [...items, { item: product, count }];
            }
            updateItemsStorage(next);
            return next;
        });
    };

    const removeItem = (productId: number) => {
        setItems((items) => {
            const next = items.filter((_item) => _item.item.id !== productId);
            updateItemsStorage(next);
            return next;
        });
    };

    const clear = () => {
        setItems(initialState.items);
        updateItemsStorage([]);
    };

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                clear,
                getItem,
                hasItem,
                count,
                total
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export { CartContext, CartProvider };