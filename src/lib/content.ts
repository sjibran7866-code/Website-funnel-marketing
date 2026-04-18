import fs from "fs";
import path from "path";
import type { SiteContent, Booth, FAQ, Testimonial, AddOn } from "@/types";

const dataDir = path.join(process.cwd(), "src/data");

function readJSON<T>(filename: string): T {
  const filePath = path.join(dataDir, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

function writeJSON<T>(filename: string, data: T): void {
  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export function getContent(): SiteContent {
  return readJSON<SiteContent>("content.json");
}

export function updateContent(content: SiteContent): void {
  writeJSON("content.json", content);
}

export function getBooths(): Booth[] {
  return readJSON<Booth[]>("booths.json");
}

export function updateBooths(booths: Booth[]): void {
  writeJSON("booths.json", booths);
}

export function getFAQs(): FAQ[] {
  return readJSON<FAQ[]>("faqs.json");
}

export function updateFAQs(faqs: FAQ[]): void {
  writeJSON("faqs.json", faqs);
}

export function getTestimonials(): Testimonial[] {
  return readJSON<Testimonial[]>("testimonials.json");
}

export function getAddOns(): AddOn[] {
  return readJSON<AddOn[]>("addons.json");
}
