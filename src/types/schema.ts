import type { BlogPosting, Person, WithContext } from "schema-dts";

export type StructuredData = WithContext<Person | BlogPosting>;

export type { BlogPosting, Person };
