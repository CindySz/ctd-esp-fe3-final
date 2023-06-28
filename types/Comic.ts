export interface IComicsMarvel {
    code:            number;
    status:          string;
    copyright:       string;
    attributionText: string;
    attributionHTML: string;
    etag:            string;
    data:            IData;
}

export interface IData {
    offset:  number;
    limit:   number;
    total:   number;
    count:   number;
    results: IResult[];
}

export interface IResult {
    id:                 number;
    digitalId:          number;
    title:              string;
    issueNumber:        number;
    variantDescription: string;
    description:        null | string;
    modified:           string;
    isbn:               string;
    upc:                string;
    diamondCode:        IDiamondCode;
    ean:                string;
    issn:               string;
    format:             IFormat;
    pageCount:          number;
    textObjects:        ITextObject[];
    resourceURI:        string;
    urls:               URL[];
    series:             ISeries;
    variants:           ISeries[];
    collections:        any[];
    collectedIssues:    ISeries[];
    dates:              IDateElement[];
    prices:             IPrice[];
    thumbnail:          IThumbnail;
    images:             IThumbnail[];
    creators:           ICreators;
    characters:         ICharacters;
    stories:            IStories;
    events:             ICharacters;
    stock:              number;
    price:              number;
    oldPrice:           number;
}

export interface ICharacters {
    available:     number;
    collectionURI: string;
    items:         ISeries[];
    returned:      number;
}

export interface ISeries {
    resourceURI: string;
    name:        string;
}

export interface ICreators {
    available:     number;
    collectionURI: string;
    items:         ICreatorsItem[];
    returned:      number;
}

export interface ICreatorsItem {
    resourceURI: string;
    name:        string;
    role:        IRole;
}

export enum IRole {
    Colorist = "colorist",
    Editor = "editor",
    Inker = "inker",
    Letterer = "letterer",
    Penciler = "penciler",
    Penciller = "penciller",
    PencillerCover = "penciller (cover)",
    Writer = "writer",
}

export interface IDateElement {
    type: IDateType;
    date: string;
}

export enum IDateType {
    DigitalPurchaseDate = "digitalPurchaseDate",
    FocDate = "focDate",
    OnsaleDate = "onsaleDate",
    UnlimitedDate = "unlimitedDate",
}

export enum IDiamondCode {
    Empty = "",
    Jul190068 = "JUL190068",
}

export enum IFormat {
    Comic = "Comic",
    Digest = "Digest",
    Empty = "",
    TradePaperback = "Trade Paperback",
}

export interface IThumbnail {
    path:      string;
    extension: IExtension;
}

export enum IExtension {
    Jpg = "jpg",
}

export interface IPrice {
    type:  IPriceType;
    price: number;
}

export enum IPriceType {
    DigitalPurchasePrice = "digitalPurchasePrice",
    PrintPrice = "printPrice",
}

export interface IStories {
    available:     number;
    collectionURI: string;
    items:        IStoriesItem[];
    returned:      number;
}

export interface IStoriesItem {
    resourceURI: string;
    name:        string;
    type:        ItemType;
}

export enum ItemType {
    Cover = "cover",
    InteriorStory = "interiorStory",
    Promo = "promo",
}

export interface ITextObject {
    type:     TextObjectType;
    language: Language;
    text:     string;
}

export enum Language {
    EnUs = "en-us",
}

export enum TextObjectType {
    IssueSolicitText = "issue_solicit_text",
}

export interface IURL {
    type: URLType;
    url:  string;
}

export enum URLType {
    Detail = "detail",
    InAppLink = "inAppLink",
    Purchase = "purchase",
    Reader = "reader",
}