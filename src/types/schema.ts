import type { Person, WithContext } from "schema-dts";

// Currently only creating Person schema data.
// If we start using other ones, create a union type.
export type StructuredData = WithContext<Person>;

export type { Person };
