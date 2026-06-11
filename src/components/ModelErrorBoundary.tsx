"use client";
import React from "react";

type Props = { fallback: React.ReactNode; children: React.ReactNode };
type State = { errored: boolean };

export class ModelErrorBoundary extends React.Component<Props, State> {
  state: State = { errored: false };
  static getDerivedStateFromError() { return { errored: true }; }
  componentDidCatch() { /* swallow — show fallback */ }
  render() { return this.state.errored ? this.props.fallback : this.props.children; }
}
