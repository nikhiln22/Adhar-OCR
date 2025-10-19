export interface IAddAadharResponseDto {
  name: string;
  dob: string;
  aadharNumber: string;
  gender: string;
  address: string;
}

export interface IAddAadharRequestDto {
  name: string;
  dob: string;
  address: string;
  aadharNumber: string;
}
