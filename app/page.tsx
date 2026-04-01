"use client";

import { useState } from "react";
import { LocaleProvider } from "@/lib/i18n/locale-context";
import Header from "@/components/layout/header";
import HeroSection from "@/components/sections/hero-section";
import CountdownSection from "@/components/sections/countdown-section";
import CoupleSection from "@/components/sections/couple-section";
import ActionButtonsSection from "@/components/sections/action-buttons-section";
import LoveStorySection from "@/components/sections/love-story-section";
import AlbumSection from "@/components/sections/album-section";
import GuestbookSection from "@/components/sections/guestbook-section";
import RSVPModal from "@/components/sections/rsvp-modal";
import WeddingGiftModal from "@/components/sections/wedding-gift-modal";
import FloatingActions from "@/components/common/floating-actions";
import Footer from "@/components/layout/footer";

export default function HomePage() {
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);

  function scrollToGuestbook() {
    const el = document.getElementById("guestbook");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <LocaleProvider>
      <Header />

      <main>
        <HeroSection />
        <CountdownSection />
        <CoupleSection />
        <ActionButtonsSection
          onSendWish={scrollToGuestbook}
          onRSVP={() => setRsvpOpen(true)}
          onWeddingGift={() => setGiftOpen(true)}
        />
        <LoveStorySection />
        <AlbumSection />
        <GuestbookSection />
      </main>

      <Footer />

      {/* Floating action buttons */}
      <FloatingActions
        onSendWish={scrollToGuestbook}
        onRSVP={() => setRsvpOpen(true)}
        onWeddingGift={() => setGiftOpen(true)}
      />

      {/* Modals */}
      <RSVPModal isOpen={rsvpOpen} onClose={() => setRsvpOpen(false)} />
      <WeddingGiftModal isOpen={giftOpen} onClose={() => setGiftOpen(false)} />
    </LocaleProvider>
  );
}
