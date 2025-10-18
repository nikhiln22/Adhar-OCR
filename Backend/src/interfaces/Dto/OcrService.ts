export interface IAddAadharResponseDto {
  dob: string;
  name: string;
  address: string;
  aadharNumber: string;
}

export interface IAddAadharRequestDto {
  name: string;
  dob: string;
  address: string;
  aadharNumber: string;
}

