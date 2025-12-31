export type ItemRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface InventoryItem {
  id: string;
  ownerId: string;
  type: string;
  rarity: ItemRarity;
  quantity: number;
}

const inventories = new Map<string, InventoryItem[]>();

export function getInventoryByOwner(ownerId: string): InventoryItem[] {
  return inventories.get(ownerId) ?? [];
}

export function addItemToInventory(
  ownerId: string,
  item: Omit<InventoryItem, 'id' | 'ownerId'>
): InventoryItem {
  const newItem: InventoryItem = {
    id: crypto.randomUUID(),
    ownerId,
    ...item
  };

  const current = inventories.get(ownerId) ?? [];
  inventories.set(ownerId, [...current, newItem]);

  return newItem;
}